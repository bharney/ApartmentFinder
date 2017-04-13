using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Portfolio.Models;
using System.Net;
using MailKit.Net.Smtp;
using MailKit;
using MimeKit;
using MailKit.Security;

namespace Portfolio.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult About()
        {
            ViewData["Message"] = "Your application description page.";

            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task Index(Email email)
        {
            if (ModelState.IsValid)
            {
                email.CreatedDate = DateTime.Now;

                var body = "<h3>Thank you for contacting Brian Harney!</h3><p>{0}, <br/>I appreciate you reaching out. I am always looking to build new relationships and take on new projects. Please contact me if you have any questions, or just want to keep in touch! <br/><br/>Please see the message you sent to me through my website,<a href=&quot;www.bharney.com&quot;>BHarney.com</a>, below: <br/>Name: {1} <br/>Email: {2} <br/>Phone: {3} <br/>Message: {4}</p><Thank you for contacting me!<br/> Give me a call at (630)849-6948 or email me at <br/><br/>Kind Regards, <br/>Brian Harney";
                var message = new MimeMessage();
                message.To.Add(new MailboxAddress(email.Name,"bharney0@gmail.com"));
                message.To.Add(new MailboxAddress(email.Name, email.EmailAddress));
                message.From.Add(new MailboxAddress("Brian Harney", "bharney0@gmail.com"));
                message.Subject = "Thank you for contacting Brian Harney!";
                message.Body = new TextPart("plain") { Text = string.Format(body, email.Name, email.Name, email.EmailAddress, email.Phone, email.Message) };
                //message.HtmlBody = true;

                using (var smtp = new SmtpClient())
                {
                    var credential = new NetworkCredential
                    {
                        UserName = "bharney@bharney.com",  // replace with valid value
                        Password = "!Testing123"  // replace with valid value
                    };
                        smtp.LocalDomain = "bharney.com";
                        // check your smtp server setting and amend accordingly:
                        await smtp.ConnectAsync("mail.bharney.com", 587, SecureSocketOptions.Auto).ConfigureAwait(false);
                        await smtp.AuthenticateAsync(credential);
                        await smtp.SendAsync(message).ConfigureAwait(false);
                        await smtp.DisconnectAsync(true).ConfigureAwait(false);
                }
            }
        }

        public IActionResult Error()
        {
            return View();
        }
    }
}
