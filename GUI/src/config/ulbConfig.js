/**
 * ULB Configuration Map
 * hostname nusar dashboard config automatically detect hoto.
 * Navhin ULB add karayche asal tyas khali entry add kara.
 */
const ULB_CONFIG = {
  // Dhule Mahanagarpalika (Default / local dev)
  'rtsdashboard.dhulecorporation.in': {
    ulbId: 1670,
    name: 'धुळे महानगरपालिका',
    nameEn: 'Dhule Municipal Corporation',
    showDropdowns: true,
  },
  'rtsdashboard.nagarkaryavalinewuat.com': {
    ulbId: 1670,
    name: 'धुळे महानगरपालिका',
    nameEn: 'Dhule Municipal Corporation',
    showDropdowns: true,
  },

  // Mira Bhayandar Municipal Corporation
  'dashboard.mbmc.gov.in': {
    ulbId: 1710,
    name: 'मिरा भाईंदर महानगरपालिका',
    nameEn: 'Mira Bhayandar Municipal Corporation',
    showDropdowns: false,
  },

  // Local development fallback
  'localhost': {
    ulbId: 1670,
    name: 'धुळे महानगरपालिका',
    nameEn: 'Dhule Municipal Corporation',
    showDropdowns: true,
  },
  '127.0.0.1': {
    ulbId: 1670,
    name: 'धुळे महानगरपालिका',
    nameEn: 'Dhule Municipal Corporation',
    showDropdowns: true,
  },
};

/** Default config if hostname not found */
const DEFAULT_CONFIG = {
  ulbId: Number(import.meta.env.VITE_ULBID) || 1670,
  name: 'महानगरपालिका',
  nameEn: 'Municipal Corporation',
  showDropdowns: true,
};

/**
 * Returns ULB config based on current browser hostname.
 * @returns {{ ulbId: number, name: string, nameEn: string, showDropdowns: boolean }}
 */
export function getUlbConfig() {
  const hostname = window.location.hostname;
  return ULB_CONFIG[hostname] || DEFAULT_CONFIG;
}

export default ULB_CONFIG;
