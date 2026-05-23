# HdfTv PodStudio Relay

A WebSocket-based streaming relay that captures media streams and forwards them to Facebook Live using FFmpeg.

## Features

- Express.js HTTP server with CORS support
- WebSocket server for receiving media streams
- FFmpeg integration for video/audio encoding
- Facebook Live streaming support
- Health check endpoint
- Configurable port via environment variables

## Installation

```bash
npm install
```

## Requirements

- Node.js >= 14.0.0
- FFmpeg installed and available in system PATH

## Usage

### Start the relay

```bash
npm start
```

The relay will start on port 3456 (or custom port via `PORT` environment variable):
- HTTP Server: `http://localhost:3456`
- WebSocket Server: `ws://localhost:3457`

### Environment Variables

- `PORT`: HTTP server port (default: 3456)
- WebSocket server runs on PORT+1

### Endpoints

#### GET /health
Returns health status and destination count:
```json
{
  "ok": true,
  "dests": 1
}
```

## Architecture

1. **Express Server**: Handles HTTP requests and CORS
2. **WebSocket Server**: Receives media streams from clients
3. **FFmpeg Process**: Encodes incoming stream and sends to Facebook Live
   - Video: libx264 codec, 3000kbps bitrate, veryfast preset
   - Audio: AAC codec, 160kbps bitrate, 44100Hz sample rate
   - Output: RTMPS to Facebook Live

## Security Notes

- Replace the Facebook Live RTMPS URL with your actual streaming key
- Consider implementing authentication for WebSocket connections
- Use HTTPS/WSS in production
- Keep FFmpeg updated for security patches

## Configuration

Edit the `TEE` constant in `relay.js` to change the Facebook Live RTMPS URL:

```javascript
const TEE="[f=flv]rtmps://live-api-s.facebook.com:443/rtmp/YOUR-STREAM-KEY";
```

## License

MIT
