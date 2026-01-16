import csv
import io
from fastapi.responses import StreamingResponse


def generate_csv(headers: list[str], rows: list[list]):
    output = io.StringIO()
    writer = csv.writer(output)

    writer.writerow(headers)
    writer.writerows(rows)

    output.seek(0)

    return StreamingResponse(
        output,
        media_type="text/csv",
        headers={
            "Content-Disposition": "attachment; filename=report.csv"
        }
    )
