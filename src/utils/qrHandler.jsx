export const generateQRData = (type, data) => {
  const baseData = {
    type,
    timestamp: new Date().toISOString(),
    source: 'qripocalypse'
  };

  switch (type) {
    case 'character':
      return {
        ...baseData,
        character: data.name,
        summonCode: `SUMMON_${data.name.toUpperCase()}_${Date.now()}`
      };
    case 'theme':
      return {
        ...baseData,
        theme: data.name,
        activationCode: `THEME_${data.name.toUpperCase()}`
      };
    case 'diff':
      return {
        ...baseData,
        diffId: data.id,
        summary: data.summary
      };
    default:
      return baseData;
  }
};

export const parseQRData = (qrData) => {
  try {
    return JSON.parse(qrData);
  } catch {
    return { type: 'unknown', data: qrData };
  }
};