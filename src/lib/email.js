/**
 * Mock Email Service
 * In production, replace console.log with Resend or SendGrid API calls.
 */

export const sendEmail = async ({ to, subject, html }) => {
  console.log(`
  📧 SENDING EMAIL
  To: ${to}
  Subject: ${subject}
  ---------------------
  ${html}
  ---------------------
  `)
  return { success: true }
}

export const sendWelcomeEmail = async (email, name) => {
  return sendEmail({
    to: email,
    subject: "Welcome to Annyeong Academy! 🇰🇷",
    html: `<h1>Annyeong, ${name}!</h1><p>Thanks for joining us. Start your first lesson now.</p>`
  })
}

export const sendReceiptEmail = async (email, orderId, amount) => {
  return sendEmail({
    to: email,
    subject: `Receipt for Order #${orderId}`,
    html: `<h1>Payment Confirmed</h1><p>We received your payment of ${amount}. Access your content in the dashboard.</p>`
  })
}
