# IPFS CORE + DAPPs 

## Edge Case : 

They are multiple limitation on directly running ipfs in the browser, see : 

https://github.com/ipfs/js-ipfs/blob/master/docs/BROWSERS.md#limitations-of-the-browser-context

For that, you need to add a workaround if you really wish total independance when using IPFS : 

https://github.com/ipfs/js-ipfs/blob/master/docs/BROWSERS.md#addressing-limitations 

Here's some suggestion about best practices to follow when you want to use IPFS in the browser (creating an instance, we'll adress that in react later on) : 

https://github.com/ipfs/js-ipfs/blob/master/docs/BROWSERS.md#best-practices

For that, you need to run your own "rendezvous" server, or pass trought an existing swarm node. 

It basically allows P2P nodes to discover and "handshakes" each others. 

https://en.wikipedia.org/wiki/Rendezvous_protocol

Conclusion : 

Using IPFS-Core on the browser is very tricky, since webbrowsers got some protective features that they implement. Also, in production, for some reason, it require web-assembly. 

One work around will be to use the ipfs-http-api, so that it only rely on a distant ipfs-pinning-api and http protocol.

I'll refractor that project that way, for scalability and portability amongs all browsers. 
