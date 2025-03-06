export async function GET(req) {
  const spreadsheetId = new URL(req.url).searchParams.get('spreadsheetId');
  
  return new Response(
    new ReadableStream({
      async start(controller) {
        setInterval(async () => {
          const data = await checkSheetUpdates(spreadsheetId);
          controller.enqueue(`data: ${JSON.stringify(data)}\n\n`);
        }, 5000); // Check every 5 seconds
      }
    }),
    {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
      }
    }
  );
}
