import jsPDF from 'jspdf'

export const generateInvoice = (purchase, profile) => {
  const doc = new jsPDF()
  const pageWidth = doc.internal.pageSize.getWidth()
  
  // Header
  doc.setFontSize(22)
  doc.setTextColor(106, 17, 203) // Brand Purple
  doc.text("Annyeong Academy", 20, 20)
  
  doc.setFontSize(10)
  doc.setTextColor(100)
  doc.text("Invoice / Receipt", pageWidth - 20, 20, { align: 'right' })
  
  // Line
  doc.setDrawColor(200)
  doc.line(20, 25, pageWidth - 20, 25)

  // Info
  doc.setFontSize(10)
  doc.setTextColor(0)
  
  const yStart = 40
  doc.text(`Date: ${new Date(purchase.created_at).toLocaleDateString()}`, 20, yStart)
  doc.text(`Order ID: ${purchase.id}`, 20, yStart + 6)
  doc.text(`Customer: ${profile?.full_name || 'Student'}`, 20, yStart + 12)
  
  // Item Table Header
  doc.setFillColor(248, 249, 252)
  doc.rect(20, yStart + 25, pageWidth - 40, 10, 'F')
  doc.setFont(undefined, 'bold')
  doc.text("Item Description", 25, yStart + 31)
  doc.text("Price", pageWidth - 25, yStart + 31, { align: 'right' })
  
  // Item Details
  doc.setFont(undefined, 'normal')
  doc.text(purchase.products?.title || "Unknown Product", 25, yStart + 45)
  doc.text(purchase.products?.price || "0 Ft", pageWidth - 25, yStart + 45, { align: 'right' })
  
  // Total
  doc.line(20, yStart + 55, pageWidth - 20, yStart + 55)
  doc.setFont(undefined, 'bold')
  doc.text("Total Paid", pageWidth - 60, yStart + 65)
  doc.text(purchase.products?.price || "0 Ft", pageWidth - 25, yStart + 65, { align: 'right' })

  // Footer
  doc.setFontSize(8)
  doc.setTextColor(150)
  doc.text("Annyeong Academy - Learn Korean Without English", 20, 280)
  doc.text("Thank you for your purchase!", 20, 285)

  doc.save(`Invoice_${purchase.id.slice(0,8)}.pdf`)
}
