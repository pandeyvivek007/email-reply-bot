package com.pandeyvivek007.email_reply_bot.controller;

import lombok.Data;


public class EmailRequest {
    private String emailContent;
    private String tone;

    public EmailRequest() {
    }

    public EmailRequest(String emailContent) {
        this.emailContent = emailContent;
    }

    public EmailRequest(String emailContent, String tone) {
        this.emailContent = emailContent;
        this.tone = tone;
    }



    public String getEmailContent() {
        return emailContent;
    }

    public void setEmailContent(String emailContent) {
        this.emailContent = emailContent;
    }

    public String getTone() {
        return tone;
    }

    public void setTone(String tone) {
        this.tone = tone;
    }
}
