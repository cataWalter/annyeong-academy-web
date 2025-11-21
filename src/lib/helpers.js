/**
 * Extracts a value from a custom tag in the description.
 * Format: [[TAG_NAME::Value]]
 */
export const extractTag = (text, tagName) => {
  if (!text) return null
  const regex = new RegExp(`\\[\\[${tagName}::(.*?)\\]\\]`)
  const match = text.match(regex)
  return match ? match[1] : null
}

/**
 * Removes all custom tags from the description for display purposes.
 */
export const cleanDescription = (text) => {
  if (!text) return ""
  return text.replace(/\[\[.*?\]\]/g, '').trim()
}

/**
 * Generates a random file path for Supabase storage
 */
export const generateFilePath = (folder, file) => {
  const fileExt = file.name.split('.').pop()
  const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`
  return `${folder}/${fileName}`
}
