  if (!process.env.NETLIFY) {
    // get local env vars if not in CI
    // if in CI i expect its already set via the Netlify UI
    require('dotenv').config();
}

if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL) throw new Error('no GOOGLE_SERVICE_ACCOUNT_EMAIL env var set');
if (!process.env.GOOGLE_PRIVATE_KEY) throw new Error('no GOOGLE_PRIVATE_KEY env var set');
if (!process.env.GOOGLE_SPREADSHEET_ID_FROM_URL) throw new Error('no GOOGLE_SPREADSHEET_ID_FROM_URL env var set');

const { GoogleSpreadsheet } = require('google-spreadsheet');

exports.handler = async (event, context) => {
    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SPREADSHEET_ID_FROM_URL);

    await doc.useServiceAccountAuth({
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n')
    });
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];

    try {
        const data = JSON.parse(event.body).payload.data;
        const addedRow = await sheet.addRow(data);
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: `POST Success - added row ${addedRow._rowNumber - 1}`
            })
        };
    } catch (err) {
        console.error('error ocurred in processing ', event);
        console.error(err);
        return {
            statusCode: 500,
            body: err.toString()
        };
    }
};
