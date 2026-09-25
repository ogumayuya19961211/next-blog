export async function GET() {
  try {
    const pg = require('pg');
    return Response.json({
      ok: true,
      hasClient: typeof pg.Client,
      hasPool: typeof pg.Pool,
      keys: Object.keys(pg).slice(0, 20),
    });
  } catch (e: any) {
    return Response.json(
      { ok: false, message: e?.message, code: e?.code, stack: e?.stack },
      { status: 500 }
    );
  }
}
