import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: 'smtp-relay.brevo.com',
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.BREVO_SMTP_USER,
    pass: process.env.BREVO_SMTP_PASS,
  },
})

export const sendPasswordConfirmEmail = async (toEmail, confirmLink) => {
  const info = await transporter.sendMail({
    from: '"ToothTime" <admin253213@gmail.com>',
    to: toEmail,
    subject: 'Confirm your password change – ToothTime',
    html: `
      <div style="font-family: 'Segoe UI', sans-serif; max-width: 480px; margin: 0 auto; padding: 32px; border: 1px solid #e5e7eb; border-radius: 12px;">
        <h2 style="margin-bottom: 8px;">🦷 <span style="color: #2ec4b6;">Tooth</span><span style="color: #17a99e;">Time</span></h2>
        <h3 style="color: #1e1e1e; margin-bottom: 16px;">Confirm Password Change</h3>
        <p style="color: #6b7280; line-height: 1.6; margin-bottom: 24px;">
          You requested to change your password. Click the button below to confirm.
          This link expires in <strong>30 minutes</strong>.
        </p>
        <a href="${confirmLink}" style="
          display: inline-block;
          background: #2ec4b6;
          color: white;
          padding: 12px 28px;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 600;
          font-size: 15px;
        ">Confirm Password Change</a>
        <p style="color: #9ca3af; font-size: 12px; margin-top: 28px;">
          If you did not request this, you can safely ignore this email. Your password will not change.
        </p>
      </div>
    `,
  })

  console.log('Confirmation email sent, id:', info.messageId)
}

export const sendPasswordUpdatedEmail = async (toEmail) => {
  const info = await transporter.sendMail({
    from: '"ToothTime" <admin253213@gmail.com>',
    to: toEmail,
    subject: 'Your password has been updated – ToothTime',
    html: `
      <div style="font-family: 'Segoe UI', sans-serif; max-width: 480px; margin: 0 auto; padding: 32px; border: 1px solid #e5e7eb; border-radius: 12px;">
        <h2 style="margin-bottom: 8px;">🦷 <span style="color: #2ec4b6;">Tooth</span><span style="color: #17a99e;">Time</span></h2>
        <h3 style="color: #1e1e1e; margin-bottom: 16px;">Password Updated Successfully</h3>
        <p style="color: #6b7280; line-height: 1.6; margin-bottom: 24px;">
          Your ToothTime account password has been changed successfully.
          You can now sign in with your new password.
        </p>
        <p style="color: #9ca3af; font-size: 12px; margin-top: 28px;">
          If you did not make this change, please contact us immediately.
        </p>
      </div>
    `,
  })

  console.log('Password updated email sent, id:', info.messageId)
}
