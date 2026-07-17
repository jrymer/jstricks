export type AssetStatus = "online" | "offline" | "degraded";
export type AssetId = string & { readonly __brand: "AssetId" };

export interface Asset {
  id: AssetId;
  name: string;
  status: AssetStatus;
  lat: number;
  lng: number;
}

const MOCK_ASSETS: Asset[] = [
  { id: "asset-1" as AssetId, name: "Eagle-1", status: "online", lat: 37.7749, lng: -122.4194 },
  { id: "asset-2" as AssetId, name: "Falcon-2", status: "offline", lat: 40.7128, lng: -74.006 },
  { id: "asset-3" as AssetId, name: "Hawk-3", status: "degraded", lat: 51.5074, lng: -0.1278 },
];

export async function fetchAssets(): Promise<Asset[]> {
  await new Promise((r) => setTimeout(r, 300));
  return MOCK_ASSETS;
}

export async function fetchAsset(id: AssetId): Promise<Asset> {
  await new Promise((r) => setTimeout(r, 800));
  const asset = MOCK_ASSETS.find((a) => a.id === id);
  if (!asset) throw new Error(`Asset ${id} not found`);
  return asset;
}

export async function fetchAssetHistory(id: AssetId): Promise<{ ts: number; lat: number; lng: number }[]> {
  await new Promise((r) => setTimeout(r, 2000));
  return [
    { ts: Date.now() - 3000, lat: 37.77, lng: -122.41 },
    { ts: Date.now() - 2000, lat: 37.775, lng: -122.415 },
    { ts: Date.now() - 1000, lat: 37.7749, lng: -122.4194 },
  ];
}
