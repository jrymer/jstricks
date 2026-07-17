import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { fetchAssets, fetchAsset } from "../data/assets";
import type { AssetId } from "../data/assets";

export const Route = createFileRoute("/")({
  loader: async ({ context: { queryClient } }) => {
    await queryClient.ensureQueryData({
      queryKey: ["assets"],
      queryFn: fetchAssets,
    });
    queryClient.prefetchQuery({
      queryKey: ["asset", "asset-1" as AssetId],
      queryFn: () => fetchAsset("asset-1" as AssetId),
    });
  },
  component: Index,
});

function Index() {
  const { data: assets } = useQuery({
    queryKey: ["assets"],
    queryFn: fetchAssets,
  });

  const { data: featuredAsset } = useQuery({
    queryKey: ["asset", "asset-1" as AssetId],
    queryFn: () => fetchAsset("asset-1" as AssetId),
  });

  return (
    <div className="p-4">
      <h3 className="text-xl font-bold mb-4">Asset Fleet</h3>

      <div className="mb-6 p-3 border rounded">
        <h4 className="font-semibold">Featured Asset</h4>
        <p>
          {featuredAsset?.name} — {featuredAsset?.status}
        </p>
      </div>

      <ul className="space-y-2">
        {assets?.map((asset) => (
          <li key={asset.id} className="flex items-center gap-3">
            <span
              className={`w-2 h-2 rounded-full ${
                asset.status === "online"
                  ? "bg-green-500"
                  : asset.status === "degraded"
                    ? "bg-yellow-500"
                    : "bg-red-500"
              }`}
            />
            <Link to="/about" className="hover:underline">
              {asset.name}
            </Link>
            <span className="text-sm text-gray-500">{asset.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
