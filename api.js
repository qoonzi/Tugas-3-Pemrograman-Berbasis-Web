export async function getData() {
  const response = await fetch('/dataBahanAjar.json')

  if (!response.ok) {
    throw new Error('Gagal mengambil data')
  }

  return await response.json()
}