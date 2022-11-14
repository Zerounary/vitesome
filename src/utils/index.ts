export const assetsUrl = (path = '') => {
  return `${import.meta.env.VITE_ASSETS_URL}/${path}`
}