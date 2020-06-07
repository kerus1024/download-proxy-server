# Download Proxy Server
다운로드를 위한 프록시 서버가 아닌 프록시 다운로드 서버

### Node.js DEPENDENCIES 
Node.js 14.3 버전에서 테스트 됨
```
npm install
```

# Features
* DUAL-STACK SUPPORTED

### 서버 IP BIND 관련
```
"bindIPAddress": "127.0.0.1" // IPv4 localhost bind (listen)
"bindIPAddress": "0.0.0.0" // All interfaces bind
"bindIPAddress": "::" // IPv4 + IPv6 both bind
```

### Downstream IP
#### IPv4
```
"downStreamAddress": "0.0.0.0" // All Interfaces Address
"downStreamAddress": "192.168.0.2" // Specific Interface
```
#### IPv6
`config.json` 에서
```
"downStreamAddress6": "::" // All Interfaces Address
"downStreamAddress6": "2001:db8::4476:3333" // Specific Interface
"downStreamAddress6": false // without IPv6
```
`ipv6PreferMode`가 false 인 경우, DNS 응답 순으로 결정 됨
