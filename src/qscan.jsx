import React, { useRef, useState } from 'react';
import { retrieveQRData } from './services/qrStorageService';
import { addToRecentSummons } from './services/qrStorageService';

const QRScanner = ({ scanning, onScanResult, onStartScan, onStopScan, processTextFile, decodeGrid, scannedData: externalScannedData }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [scanResult, setScanResult] = useState('');
  const [scannedData, setScannedData] = useState(null);

  // Update local scannedData when external prop changes
  React.useEffect(() => {
    if (externalScannedData) {
      setScannedData(externalScannedData);
    }
  }, [externalScannedData]);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'environment' // Use back camera on mobile
        } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setStream(mediaStream);
      setIsCameraOn(true);
      setCapturedImage(null); // Clear any previous capture
      onStartScan();
    } catch (error) {
      alert("Could not access camera: " + error.message);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
      setStream(null);
    }
    setIsCameraOn(false);
    onStopScan();
  };

  // Capture image from video stream
  const captureImage = () => {
    if (!videoRef.current) return null;

    const video = videoRef.current;
    const canvas = canvasRef.current || document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw current video frame to canvas
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert to data URL for preview
    const imageDataUrl = canvas.toDataURL('image/png');
    setCapturedImage(imageDataUrl);

    return canvas;
  };

  // Process image to extract grid pattern
  const processImage = (imageSource) => {
    return new Promise((resolve, reject) => {
      const canvas = canvasRef.current || document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      let width, height;

      if (imageSource instanceof HTMLCanvasElement) {
        // Already a canvas
        width = imageSource.width;
        height = imageSource.height;
        ctx.drawImage(imageSource, 0, 0);
      } else {
        // HTMLImageElement or HTMLVideoElement
        width = imageSource.videoWidth || imageSource.width;
        height = imageSource.videoHeight || imageSource.height;
        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(imageSource, 0, 0, width, height);
      }

      try {
        const gridSize = 20;
        const cellWidth = width / gridSize;
        const cellHeight = height / gridSize;

        const grid = [];

        // Loop 20x20 grid
        for (let row = 0; row < gridSize; row++) {
          const rowData = [];
          for (let col = 0; col < gridSize; col++) {
            // Skip first/last row and col
            if (row === 0 || row === gridSize - 1 || col === 0 || col === gridSize - 1) {
              continue;
            }

            const x = col * cellWidth;
            const y = row * cellHeight;

            const cellData = ctx.getImageData(x, y, cellWidth, cellHeight);
            const pixels = cellData.data;

            let diag1 = 0; // "\"
            let diag2 = 0; // "/"

            for (let i = 0; i < pixels.length; i += 4) {
              const r = pixels[i];
              const g = pixels[i + 1];
              const b = pixels[i + 2];
              const brightness = (r + g + b) / 3;

              const pixelIndex = i / 4;
              const px = pixelIndex % cellWidth;
              const py = Math.floor(pixelIndex / cellWidth);

              if (px === py) diag1 += brightness;
              if (px === cellWidth - py - 1) diag2 += brightness;
            }

            rowData.push(diag1 > diag2 ? "/" : "\\");
          }
          if (rowData.length > 0) grid.push(rowData);
        }

        // Log grid (18x18)
        console.log("Extracted Grid:");
        grid.forEach(r => console.log(r.join(" ")));

        // Decode into ObjectId
        const decodedOid = decodeGrid(grid, 24);
        resolve(decodedOid);

      } catch (error) {
        reject(new Error("Failed to process image: " + error.message));
      }
    });
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploadedFile(file);
    setProcessing(true);
    setCapturedImage(null);

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = async () => {
        try {
          const objectId = await processImage(img);
          handleScanComplete(objectId);
        } catch (error) {
          setScanResult(`Error: ${error.message}`);
          setScannedData(null);
        } finally {
          setProcessing(false);
        }
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  };

  const handleTextFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploadedFile(file);
    setProcessing(true);
    setCapturedImage(null);

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const fileContent = e.target.result;
        const grid = processTextFile(fileContent);
        const decodedOid = decodeGrid(grid, 24);
        
        if (decodedOid && decodedOid.length === 24) {
          handleScanComplete(decodedOid);
        } else {
          throw new Error('Failed to decode valid ObjectId from grid pattern');
        }
      } catch (error) {
        setScanResult(`Error: ${error.message}`);
        setScannedData(null);
      } finally {
        setProcessing(false);
      }
    };
    reader.readAsText(file);
  };

  const handleScanComplete = (objectId) => {
    // Retrieve QR data from localStorage
    const qrData = retrieveQRData(objectId);
    
    if (!qrData) {
      setScanResult(`Error: QR code not found (ID: ${objectId})`);
      setScannedData(null);
      return;
    }
    
    // Set scanned data for display
    setScannedData(qrData);
    setScanResult(`✅ Successfully scanned ${qrData.type} QR code!`);
    
    // Add to recent summons
    addToRecentSummons({
      id: qrData.id,
      type: qrData.type,
      name: getDisplayName(qrData),
      timestamp: qrData.timestamp
    });
    
    // Notify parent with both objectId and data
    onScanResult(objectId, qrData);
  };
  
  const getDisplayName = (qrData) => {
    switch (qrData.type) {
      case 'theme':
        return qrData.data.themeName;
      case 'diff':
        return `${qrData.data.projectName} - ${qrData.data.summary.substring(0, 30)}`;
      case 'commit':
        return `${qrData.data.projectName} - ${qrData.data.message.substring(0, 30)}`;
      case 'projectFile':
        return `${qrData.data.projectName} - ${qrData.data.fileName}`;
      case 'deployment':
        return `${qrData.data.projectName} - ${qrData.data.platform}`;
      default:
        return 'Unknown';
    }
  };

  const handleScan = async () => {
    if (!videoRef.current) return;

    setProcessing(true);
    try {
      // First capture the image
      const capturedCanvas = captureImage();
      
      // Then process it
      const objectId = await processImage(capturedCanvas);
      handleScanComplete(objectId);
    } catch (error) {
      setScanResult(`Error: ${error.message}`);
      setScannedData(null);
    } finally {
      setProcessing(false);
    }
  };

  const simulateScan = () => {
    // Simulate scanning a theme QR code
    const simulatedId = '507f1f77bcf86cd799439011';
    handleScanComplete(simulatedId);
  };

  // Render scanned data based on type
  const renderScannedData = () => {
    if (!scannedData) return null;

    const { type, data } = scannedData;

    switch (type) {
      case 'theme':
        return (
          <div className="bg-purple-900/30 border border-purple-700 rounded-lg p-4">
            <h4 className="text-purple-400 font-bold mb-3 flex items-center gap-2">
              <span className="text-2xl">{data.icon}</span>
              Theme Summoned
            </h4>
            <div className="space-y-2 text-sm">
              <p className="text-white"><strong>Theme:</strong> {data.themeName}</p>
              <p className="text-gray-300"><strong>ID:</strong> {data.themeId}</p>
              {data.colors && (
                <div className="flex gap-2 mt-2">
                  <div 
                    className="w-12 h-12 rounded border-2 border-white" 
                    style={{ backgroundColor: data.colors.primary }}
                    title="Primary Color"
                  />
                  <div 
                    className="w-12 h-12 rounded border-2 border-white" 
                    style={{ backgroundColor: data.colors.secondary }}
                    title="Secondary Color"
                  />
                </div>
              )}
            </div>
          </div>
        );

      case 'diff':
        return (
          <div className="bg-green-900/30 border border-green-700 rounded-lg p-4">
            <h4 className="text-green-400 font-bold mb-3 flex items-center gap-2">
              <span className="text-2xl">🔀</span>
              Diff Summary Summoned
            </h4>
            <div className="space-y-2 text-sm">
              <p className="text-white"><strong>Project:</strong> {data.projectName}</p>
              <p className="text-gray-300"><strong>Summary:</strong> {data.summary}</p>
              <div className="grid grid-cols-3 gap-2 mt-2">
                <div className="bg-gray-800 rounded p-2 text-center">
                  <div className="text-blue-400 font-bold">{data.filesChanged}</div>
                  <div className="text-xs text-gray-400">Files</div>
                </div>
                <div className="bg-gray-800 rounded p-2 text-center">
                  <div className="text-green-400 font-bold">+{data.additions}</div>
                  <div className="text-xs text-gray-400">Added</div>
                </div>
                <div className="bg-gray-800 rounded p-2 text-center">
                  <div className="text-red-400 font-bold">-{data.deletions}</div>
                  <div className="text-xs text-gray-400">Deleted</div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'commit':
        return (
          <div className="bg-gray-700/30 border border-gray-600 rounded-lg p-4">
            <h4 className="text-gray-300 font-bold mb-3 flex items-center gap-2">
              <span className="text-2xl">⚰️</span>
              Commit Summoned
            </h4>
            <div className="space-y-2 text-sm">
              <p className="text-white"><strong>Project:</strong> {data.projectName}</p>
              <p className="text-gray-300"><strong>Message:</strong> {data.message}</p>
              <p className="text-gray-400"><strong>Author:</strong> {data.author}</p>
              <p className="text-gray-400"><strong>Hash:</strong> <code className="bg-gray-800 px-2 py-1 rounded">{data.commitHash}</code></p>
              <p className="text-gray-500 text-xs"><strong>Time:</strong> {new Date(data.timestamp).toLocaleString()}</p>
            </div>
          </div>
        );

      case 'projectFile':
        return (
          <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-4">
            <h4 className="text-blue-400 font-bold mb-3 flex items-center gap-2">
              <span className="text-2xl">📄</span>
              Project File Summoned
            </h4>
            <div className="space-y-2 text-sm">
              <p className="text-white"><strong>Project:</strong> {data.projectName}</p>
              <p className="text-gray-300"><strong>File:</strong> {data.fileName}</p>
              <p className="text-gray-400"><strong>Path:</strong> {data.filePath}</p>
              {data.language && (
                <p className="text-gray-400"><strong>Language:</strong> {data.language}</p>
              )}
              {data.content && (
                <div className="mt-3">
                  <p className="text-gray-300 font-bold mb-2">Content:</p>
                  <pre className="bg-gray-900 border border-gray-700 rounded p-3 text-xs overflow-x-auto max-h-64 overflow-y-auto">
                    <code className="text-green-400">{data.content}</code>
                  </pre>
                </div>
              )}
            </div>
          </div>
        );

      case 'deployment':
        return (
          <div className="bg-orange-900/30 border border-orange-700 rounded-lg p-4">
            <h4 className="text-orange-400 font-bold mb-3 flex items-center gap-2">
              <span className="text-2xl">🚀</span>
              Deployment Info Summoned
            </h4>
            <div className="space-y-2 text-sm">
              <p className="text-white"><strong>Project:</strong> {data.projectName}</p>
              <p className="text-gray-300"><strong>Platform:</strong> {data.platform.toUpperCase()}</p>
              <p className="text-gray-400">
                <strong>Status:</strong>{' '}
                <span className={`px-2 py-1 rounded text-xs font-bold ${
                  data.status === 'active' ? 'bg-green-900 text-green-300' :
                  data.status === 'pending' ? 'bg-yellow-900 text-yellow-300' :
                  'bg-red-900 text-red-300'
                }`}>
                  {data.status.toUpperCase()}
                </span>
              </p>
              {data.lastDeployed && (
                <p className="text-gray-500 text-xs"><strong>Last Deployed:</strong> {new Date(data.lastDeployed).toLocaleString()}</p>
              )}
              {data.configuration && (
                <div className="mt-3">
                  <p className="text-gray-300 font-bold mb-2">Configuration:</p>
                  <pre className="bg-gray-900 border border-gray-700 rounded p-3 text-xs overflow-x-auto max-h-48 overflow-y-auto">
                    <code className="text-orange-400">{JSON.stringify(data.configuration, null, 2)}</code>
                  </pre>
                </div>
              )}
            </div>
          </div>
        );

      default:
        return (
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
            <h4 className="text-gray-400 font-bold mb-3">Unknown Type</h4>
            <p className="text-gray-500 text-sm">Cannot display data for type: {type}</p>
          </div>
        );
    }
  };

  return (
    <div>
      <h3 className="text-xl font-bold text-white mb-4">Scan Summoning QR</h3>
      
      <div className="space-y-4">
        {/* Camera Preview Area */}
        <div className="bg-black border-2 border-green-600 rounded-lg p-8 flex items-center justify-center">
          <div className="text-center">
            {/* Video Stream */}
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className={`w-full max-w-[600px] h-auto border-2 ${isCameraOn ? 'border-green-500' : 'border-gray-600'} rounded-lg mb-4 ${
                isCameraOn ? 'block' : 'hidden'
              }`}
            />
            
            {/* Camera Off Placeholder */}
            {!isCameraOn && !capturedImage && (
              <div className="w-full max-w-[600px] h-[180px] bg-gradient-to-br from-green-900 to-gray-800 rounded-lg flex items-center justify-center mx-auto mb-4">
                <div className="text-6xl">📷</div>
              </div>
            )}

            {/* Captured Image Preview */}
            {capturedImage && (
              <div className="mb-4">
                <h4 className="text-green-400 font-bold mb-2">📸 Captured Image</h4>
                <img 
                  src={capturedImage} 
                  alt="Captured" 
                  className="w-full max-w-[600px] h-auto border-2 border-green-500 rounded-lg"
                />
              </div>
            )}

            <p className="text-gray-400">
              {isCameraOn ? 'Camera is active - Point at QR code' : 'Camera feed would appear here'}
            </p>
          </div>
        </div>

        {/* Scan Result */}
        {scanResult && (
          <div className={`${scanResult.includes('Error') ? 'bg-red-900/30 border-red-700' : 'bg-green-900/30 border-green-700'} border rounded-lg p-4`}>
            <h4 className={`${scanResult.includes('Error') ? 'text-red-400' : 'text-green-400'} font-bold mb-2`}>
              {scanResult.includes('Error') ? '❌ Summoning Failed!' : '✨ Summoning Detected!'}
            </h4>
            <p className={`${scanResult.includes('Error') ? 'text-red-300' : 'text-green-300'}`}>{scanResult}</p>
          </div>
        )}

        {/* Scanned Data Display */}
        {scannedData && renderScannedData()}

        {/* Upload Status */}
        {uploadedFile && (
          <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-4">
            <h4 className="text-blue-400 font-bold mb-2">📄 Uploaded File</h4>
            <p className="text-blue-300">{uploadedFile.name}</p>
            {processing && (
              <p className="text-yellow-400 text-sm mt-2">⏳ Processing file...</p>
            )}
          </div>
        )}

        {/* Control Buttons */}
        <div className="space-y-3">
          {!scanning ? (
            <button 
              onClick={startCamera}
              disabled={processing}
              className="w-full bg-green-900 hover:bg-green-800 text-white py-3 rounded-lg font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {processing ? (
                <>
                  <span className="animate-spin">⏳</span>
                  Processing...
                </>
              ) : (
                <>
                  📹 Start Camera
                </>
              )}
            </button>
          ) : (
            <>
              <button 
                onClick={handleScan} 
                disabled={processing}
                className="w-full bg-purple-900 hover:bg-purple-800 text-white py-3 rounded-lg font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {processing ? (
                  <>
                    <span className="animate-spin">🔮</span>
                    Scanning...
                  </>
                ) : (
                  <>
                    📸 Capture & Scan
                  </>
                )}
              </button>
              
              <button 
                onClick={stopCamera}
                className="w-full bg-red-900 hover:bg-red-800 text-white py-3 rounded-lg font-bold transition-colors flex items-center justify-center gap-2"
              >
                🛑 Stop Camera
              </button>
            </>
          )}

          {/* Simulate Scan Button */}
          <button 
            onClick={simulateScan}
            className="w-full bg-orange-900 hover:bg-orange-800 text-white py-3 rounded-lg font-bold transition-colors flex items-center justify-center gap-2"
          >
            🧪 Simulate Scan
          </button>
        </div>

        {/* Upload Section */}
        <div className="border-2 border-gray-700 rounded-lg p-4">
          <h4 className="text-white font-bold mb-3 text-center">📁 Or Upload Files</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <input
                type="file"
                accept=".txt,.text"
                onChange={handleTextFileUpload}
                className="hidden"
                id="text-file-upload"
                disabled={processing}
              />
              <label 
                htmlFor="text-file-upload" 
                className={`w-full bg-blue-900 hover:bg-blue-800 text-white py-2 px-4 rounded-lg font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer ${processing ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                📄 Upload Text File
              </label>
            </div>
            
            <div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-file-upload"
                disabled={processing}
              />
              <label 
                htmlFor="image-file-upload" 
                className={`w-full bg-purple-900 hover:bg-purple-800 text-white py-2 px-4 rounded-lg font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer ${processing ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                🖼️ Upload Image
              </label>
            </div>
          </div>
        </div>

        {/* Canvas for image processing (hidden) */}
        <canvas ref={canvasRef} className="hidden" />
      </div>
    </div>
  );
};

export default QRScanner;