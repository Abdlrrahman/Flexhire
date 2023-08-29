import { Button } from "@mui/material";

export default function WebhookBtn() {
    // Function to send a webhook request
    async function sendWebhook() {
        try {
            const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
            // Replace 'webhookURL' with the actual URL where your Node.js server is running
            const webhookURL = apiBaseUrl + '/webhook';

            // Trigger the webhook
            await fetch(webhookURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log('Webhook sent successfully');
        } catch (error) {
            console.error('Failed to send webhook:', error);
        }
    }

    return (
        <div>
            <Button onClick={sendWebhook}>Send Webhook</Button>
        </div>
    );
}