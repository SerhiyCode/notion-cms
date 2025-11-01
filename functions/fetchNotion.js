
export const handler = async function (event, context) {
    try {
        const NOTION_KEY = process.env.NOTION_KEY;
        const NOTION_DB = process.env.NOTION_DB;

        console.log('NOTION_KEY exists:', !!NOTION_KEY);
        console.log('NOTION_DB exists:', !!NOTION_DB);

        const response = await fetch(`https://api.notion.com/v1/databases/${NOTION_DB}/query`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${NOTION_KEY}`,
                'Notion-Version': '2022-06-28',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                filter: {
                    property: 'Status',
                    status: {
                        equals: 'Done'
                    }
                }
            })
        });

        const data = await response.json();
        
        return {
            statusCode: 200,
            body: JSON.stringify(data)
        };
        
    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
};



