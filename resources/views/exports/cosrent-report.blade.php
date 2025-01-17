<!DOCTYPE html>
<html lang="en" <head>
<meta charset="UTF-8">
<title>Laporan Cosrent</title>
<style>
    body {
        font-family: DejaVu Sans, sans-serif;
    }
</style>
</head>

<body>
    <h1>Laporan Cosrent: {{ $cosrentName }}</h1>
    <h3>Tanggal: {{ \Carbon\Carbon::now()->format('d M Y, H:i:s') }}</h3>

    <h2>Pending Orders</h2>
    @if ($pending_orders->isEmpty())
        <p>Tidak ada orderan pending.</p>
    @else
        <table>
            <thead>
                <tr>
                    <th>No</th>
                    <th>Kostum</th>
                    <th>Kategori</th>
                    <th>Penyewa</th>
                    <th>WhatsApp</th>
                    <th>Tanggal Rental</th>
                    <th>Tanggal Kembali</th>
                    <th>Harga</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($pending_orders as $index => $order)
                    <tr>
                        <td>{{ $index + 1 }}</td>
                        <td>{{ $order->costum->name }}</td>
                        <td>{{ $order->costum->category->name }}</td>
                        <td>{{ $order->user->name }}</td>
                        <td>{{ $order->user->biodata->phone_whatsapp }}</td>
                        <td>{{ \Carbon\Carbon::parse($order->tanggal_mulai_rental)->format('d-m-Y') }}</td>
                        <td>{{ \Carbon\Carbon::parse($order->tanggal_kembali_kostum)->format('d-m-Y') }}</td>
                        <td>{{ number_format($order->costum->price, 0, ',', '.') }}</td>
                        <td>{{ $order->status }}</td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    @endif

    <h2>Confirmed Orders</h2>
    @if ($confirmed_orders->isEmpty())
        <p>Tidak ada orderan confirmed.</p>
    @else
        <table>
            <thead>
                <tr>
                    <th>No</th>
                    <th>Kostum</th>
                    <th>Kategori</th>
                    <th>Penyewa</th>
                    <th>WhatsApp</th>
                    <th>Tanggal Rental</th>
                    <th>Tanggal Kembali</th>
                    <th>Harga</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($confirmed_orders as $index => $order)
                    <tr>
                        <td>{{ $index + 1 }}</td>
                        <td>{{ $order->costum->name }}</td>
                        <td>{{ $order->costum->category->name }}</td>
                        <td>{{ $order->user->name }}</td>
                        <td>{{ $order->user->biodata->phone_whatsapp }}</td>
                        <td>{{ \Carbon\Carbon::parse($order->tanggal_mulai_rental)->format('d-m-Y') }}</td>
                        <td>{{ \Carbon\Carbon::parse($order->tanggal_kembali_kostum)->format('d-m-Y') }}</td>
                        <td>{{ number_format($order->costum->price, 0, ',', '.') }}</td>
                        <td>{{ $order->status }}</td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    @endif

    <h2>Done Orders</h2>
    @if ($done_orders->isEmpty())
        <p>Tidak ada orderan selesai.</p>
    @else
        <table>
            <thead>
                <tr>
                    <th>No</th>
                    <th>Kostum</th>
                    <th>Kategori</th>
                    <th>Penyewa</th>
                    <th>WhatsApp</th>
                    <th>Tanggal Rental</th>
                    <th>Tanggal Kembali</th>
                    <th>Harga</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($done_orders as $index => $order)
                    <tr>
                        <td>{{ $index + 1 }}</td>
                        <td>{{ $order->costum->name }}</td>
                        <td>{{ $order->costum->category->name }}</td>
                        <td>{{ $order->user->name }}</td>
                        <td>{{ $order->user->biodata->phone_whatsapp }}</td>
                        <td>{{ \Carbon\Carbon::parse($order->tanggal_mulai_rental)->format('d-m-Y') }}</td>
                        <td>{{ \Carbon\Carbon::parse($order->tanggal_kembali_kostum)->format('d-m-Y') }}</td>
                        <td>{{ number_format($order->costum->price, 0, ',', '.') }}</td>
                        <td>{{ $order->status }}</td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    @endif
</body>

</html>
