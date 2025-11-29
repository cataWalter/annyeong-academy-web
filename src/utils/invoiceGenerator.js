import jsPDF from 'jspdf'

export const generateInvoice = (order, userDetails) => {
  const doc = new jsPDF()
  
  // Header
  doc.setFontSize(22)
  doc.setTextColor(94, 56, 145) // Brand Purple
  doc.text("INVOICE", 20, 30)
  
  doc.setFontSize(10)
  doc.setTextColor(100)
  doc.text("Annyeong Academy Ltd.", 20, 40)
  doc.text("123 Seoul Street, Budapest", 20, 45)
  doc.text("info@annyeong-academy.com", 20, 50)

  // Details
  doc.setTextColor(0)
  doc.text(`Invoice ID: ${order.id.slice(0,8).toUpperCase()}`, 140, 30)
  doc.text(`Date: ${new Date(order.created_at).toLocaleDateString()}`, 140, 35)

  // Bill To
  doc.setFontSize(12)
  doc.text("Bill To:", 20, 70)
  doc.setFontSize(10)
  doc.text(userDetails.full_name || "Valued Customer", 20, 76)
  
  const billing = userDetails.billing_address || {}
  if(billing.address) {
    doc.text(billing.address, 20, 81)
    doc.text(`${billing.city}, ${billing.zip}`, 20, 86)
    doc.text(billing.country, 20, 91)
  }

  // Line Items
  doc.setLineWidth(0.5)
  doc.line(20, 100, 190, 100)
  
  doc.setFontSize(10)
  doc.text("Item", 20, 108)
  doc.text("Price", 170, 108)
  
  doc.line(20, 112, 190, 112)

  doc.setFontSize(12)
  doc.text(order.products?.title || "Product", 20, 125)
  doc.text(order.products?.price || "0", 170, 125)

  // Total
  doc.line(20, 140, 190, 140)
  doc.setFontSize(14)
  doc.text("Total:", 140, 150)
  doc.text(order.products?.price || "0", 170, 150)

  // Footer
  doc.setFontSize(8)
  doc.setTextColor(150)
  doc.text("Thank you for learning with us!", 20, 280)

  doc.save(`Invoice_${order.id.slice(0,8)}.pdf`)
}
