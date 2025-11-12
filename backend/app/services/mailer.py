# 📧 EMAIL SERVICE - SLANJE NOTIFIKACIJA I PORUKA
# ===============================================
# Ovaj servis koristi aiosmtplib za asynchronous slanje email-ova
# Podržava HTML email-ove sa stilizovanim template-ima

import smtplib
import aiosmtplib          # Async SMTP client za FastAPI
from email.mime.text import MIMEText         # Za plain text email-ove
from email.mime.multipart import MIMEMultipart  # Za HTML + text email-ove
from ..config import settings  # Uvozimo SMTP konfiguraciju
from ..schemas import BookingCreate, ContactMessageCreate  # Pydantic schemi

# 📅 FUNKCIJA ZA SLANJE BOOKING NOTIFIKACIJE
async def send_booking_notification(booking: BookingCreate):
    """
    📨 SLANJE EMAIL NOTIFIKACIJE ZA ZAKAZIVANJE ČASA
    
    Kada student zakaže privatni čas, automatski se šalje email notifikacija
    instruktoru sa svim detaljima o zahtevu.
    
    Args:
        booking: BookingCreate Pydantic model sa podacima o rezervaciji
    
    Email template je responsive HTML sa inline CSS-om za kompatibilnost.
    """
    
    # 📝 KREIRANJE EMAIL PORUKE (MIME format)
    # MIMEMultipart omogućava kombinovanje HTML i plain text verzija
    msg = MIMEMultipart('alternative')
    msg['Subject'] = f"🎓 Novi zahtev za privatni čas matematike - {booking.student_name}"
    msg['From'] = settings.smtp_username      # Šalje se iz našeg Gmail-a
    msg['To'] = settings.notification_email   # Prima instruktor
    
    # 🎨 HTML SADRŽAJ EMAIL-A
    # Inline CSS styling za maksimalnu email client kompatibilnost
    html_content = f"""
    <html>
    <head>
        <style>
            /* 📱 RESPONSIVE EMAIL CSS - inline styles za email client-e */
            body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
            .header {{ background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center; }}
            .content {{ padding: 20px; background: #f9f9f9; }}
            .info-box {{ background: white; padding: 15px; margin: 10px 0; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }}
            .label {{ font-weight: bold; color: #667eea; }}
            .footer {{ background: #333; color: white; padding: 15px; text-align: center; font-size: 14px; }}
        </style>
    </head>
    <body>
        <div class="header">
            <h2>📚 Matematika App - Novi zahtev za čas</h2>
        </div>
        
        <div class="content">
            <div class="info-box">
                <h3>👤 Informacije o studentu:</h3>
                <p><span class="label">Ime i prezime:</span> {booking.student_name}</p>
                <p><span class="label">Email:</span> {booking.student_email}</p>
                <p><span class="label">Telefon:</span> {booking.student_phone or 'Nije naveden'}</p>
            </div>
            
            <div class="info-box">
                <h3>📝 Detalji časa:</h3>
                <p><span class="label">Tema/Predmet:</span> {booking.subject or 'Nije specificirana'}</p>
                <p><span class="label">Željeni datum:</span> {booking.preferred_date.strftime('%d.%m.%Y') if booking.preferred_date else 'Fleksibilan'}</p>
                <p><span class="label">Željeno vreme:</span> {booking.preferred_time or 'Fleksibilno'}</p>
            </div>
            
            {f'<div class="info-box"><h3>💬 Poruka od studenta:</h3><p>{booking.message}</p></div>' if booking.message else ''}
        </div>
        
        <div class="footer">
            <p>🎯 Matematika App | Privatni časovi matematike</p>
            <p>Odgovori na ovaj email da potvrdiš čas ili kontaktiraš studenta.</p>
        </div>
    </body>
    </html>
    """
    
    # Dodavanje HTML sadržaja
    html_part = MIMEText(html_content, 'html', 'utf-8')
    msg.attach(html_part)
    
    try:
        # Slanje email-a preko aiosmtplib (async)
        await aiosmtplib.send(
            msg,
            hostname=settings.smtp_server,
            port=settings.smtp_port,
            start_tls=True,
            username=settings.smtp_username,
            password=settings.smtp_password
        )
        return True
    except Exception as e:
        print(f"Greška pri slanju email-a: {str(e)}")
        return False

async def send_contact_message_notification(contact: ContactMessageCreate):
    """Slanje email notifikacije za kontakt poruku"""
    
    msg = MIMEMultipart('alternative')
    msg['Subject'] = f"📧 Nova poruka sa sajta - {contact.subject}"
    msg['From'] = settings.smtp_username
    msg['To'] = settings.notification_email
    
    html_content = f"""
    <html>
    <head>
        <style>
            body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
            .header {{ background: linear-gradient(135deg, #48bb78 0%, #38a169 100%); color: white; padding: 20px; text-align: center; }}
            .content {{ padding: 20px; background: #f9f9f9; }}
            .info-box {{ background: white; padding: 15px; margin: 10px 0; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }}
            .label {{ font-weight: bold; color: #48bb78; }}
            .message-box {{ background: #f0fff4; border-left: 4px solid #48bb78; padding: 15px; margin: 15px 0; }}
            .footer {{ background: #333; color: white; padding: 15px; text-align: center; font-size: 14px; }}
        </style>
    </head>
    <body>
        <div class="header">
            <h2>📧 Matematika App - Nova kontakt poruka</h2>
        </div>
        
        <div class="content">
            <div class="info-box">
                <h3>👤 Pošaljilac:</h3>
                <p><span class="label">Ime:</span> {contact.name}</p>
                <p><span class="label">Email:</span> {contact.email}</p>
                <p><span class="label">Naslov:</span> {contact.subject or 'Bez naslova'}</p>
            </div>
            
            <div class="message-box">
                <h3>💬 Poruka:</h3>
                <p>{contact.message}</p>
            </div>
        </div>
        
        <div class="footer">
            <p>🎯 Matematika App | Kontakt forma</p>
            <p>Odgovori direktno na email pošaljioca: {contact.email}</p>
        </div>
    </body>
    </html>
    """
    
    html_part = MIMEText(html_content, 'html', 'utf-8')
    msg.attach(html_part)
    
    try:
        await aiosmtplib.send(
            msg,
            hostname=settings.smtp_server,
            port=settings.smtp_port,
            start_tls=True,
            username=settings.smtp_username,
            password=settings.smtp_password
        )
        return True
    except Exception as e:
        print(f"Greška pri slanju kontakt email-a: {str(e)}")
        return False

async def send_booking_confirmation_to_student(booking: BookingCreate):
    """Slanje potvrde studentu da je zahtev primljen"""
    
    msg = MIMEMultipart('alternative')
    msg['Subject'] = "✅ Vaš zahtev za privatni čas je primljen - Matematika App"
    msg['From'] = settings.smtp_username
    msg['To'] = booking.student_email
    
    html_content = f"""
    <html>
    <head>
        <style>
            body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
            .header {{ background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center; }}
            .content {{ padding: 20px; background: #f9f9f9; }}
            .success-box {{ background: #d4edda; border: 1px solid #c3e6cb; color: #155724; padding: 15px; border-radius: 8px; margin: 15px 0; }}
            .info-box {{ background: white; padding: 15px; margin: 10px 0; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }}
            .label {{ font-weight: bold; color: #667eea; }}
            .footer {{ background: #333; color: white; padding: 15px; text-align: center; font-size: 14px; }}
        </style>
    </head>
    <body>
        <div class="header">
            <h2>🎓 Matematika App</h2>
            <p>Vaš zahtev je uspešno primljen!</p>
        </div>
        
        <div class="content">
            <div class="success-box">
                <h3>✅ Hvala vam {booking.student_name}!</h3>
                <p>Vaš zahtev za privatni čas matematike je uspešno poslat. Uskoro ćete dobiti potvrdu termina na ovaj email.</p>
            </div>
            
            <div class="info-box">
                <h3>📋 Rezime vašeg zahteva:</h3>
                <p><span class="label">Tema:</span> {booking.subject or 'Opšta matematika'}</p>
                <p><span class="label">Željeni datum:</span> {booking.preferred_date.strftime('%d.%m.%Y') if booking.preferred_date else 'Fleksibilan'}</p>
                <p><span class="label">Željeno vreme:</span> {booking.preferred_time or 'Fleksibilno'}</p>
            </div>
        </div>
        
        <div class="footer">
            <p>🎯 Matematika App | Privatni časovi matematike</p>
            <p>Za dodatna pitanja, odgovorite na ovaj email.</p>
        </div>
    </body>
    </html>
    """
    
    html_part = MIMEText(html_content, 'html', 'utf-8')
    msg.attach(html_part)
    
    try:
        await aiosmtplib.send(
            msg,
            hostname=settings.smtp_server,
            port=settings.smtp_port,
            start_tls=True,
            username=settings.smtp_username,
            password=settings.smtp_password
        )
        return True
    except Exception as e:
        print(f"Greška pri slanju potvrde studentu: {str(e)}")
        return False
