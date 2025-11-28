export const generateInvoice = (user, purchase) => {
  console.log("Generating invoice for:", user.email);
  // Mock implementation for build to pass
  // In a real app, this might use jsPDF
  const invoiceData = {
    id: `INV-${Date.now()}`,
    date: new Date().toISOString(),
    amount: purchase?.price || '0',
    user: user.full_name || user.email
  };
  
  // Return a dummy blob url or success message
  return invoiceData;
}
