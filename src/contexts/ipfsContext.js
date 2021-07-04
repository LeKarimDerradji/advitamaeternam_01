import { createContext, useState, useEffect } from "react";
import { create } from "ipfs-core";

// créer et exporter ("named") FilterContext object
export const IpfsContext = createContext();

/* le component-provider qui embrassera la partie de notre app où on utilise ce context */
export const IpfsContextProvider = ({ children }) => {
  const [ipfs, setIpfs] = useState();

  useEffect(() => {
    async function fetchData() {
      let ipfs = await create({
        config: {
          Addresses: {
            Swarm: [
              '/dns4/wrtc-star1.par.dwebops.pub/tcp/443/wss/p2p-webrtc-star',
              '/dns4/wrtc-star2.sjc.dwebops.pub/tcp/443/wss/p2p-webrtc-star'
            ]
          }
        }
      });
      setIpfs(ipfs);
    }
    fetchData();
  }, []);

  async function addMetadata(metadata) {
    const cid = await ipfs.add(
      {
        path: `metadata.json`,
        content: metadata,
        mtime: new Date(),
      },
      { wrapWithDirectory: true, cidVersion: 1, hashAlg: "sha2-256" }
    );
    return cid.cid.string;
  }

  async function addFile(file) {
    const cid = await ipfs.add(
      {
        path: `${file.name}`,
        content: file,
        mtime: new Date(),
      },
      { wrapWithDirectory: true, cidVersion: 1, hashAlg: "sha2-256" }
    );
    return cid.cid.string;
  }

  async function getURLofImageFromCid(cid) {
    try {
      for await (const file of ipfs.ls(cid)) {
        let filePath = file.path.replace (/^/,'https://dweb.link/ipfs/');
        return filePath
      }
    } catch (e) {
      console.log(e)
    }
  }

  async function getMetadataFromCid(cid) {
    try {
      const data = await ipfs.cat(
        cid + '/metadata.json'
      );
    for await (const file of data) {
        return new TextDecoder().decode(file);
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <IpfsContext.Provider value={{ ipfs, addMetadata, getMetadataFromCid, addFile, getURLofImageFromCid }}>
      {children}
    </IpfsContext.Provider>
  );
};
