import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { fetchAssets } from "../data/assets";

export const Route = createFileRoute("/assets")({
  loader: async ({ context: { queryClient } }) => {
    await queryClient.ensureQueryData({
      queryKey: ["assets"],
      queryFn: fetchAssets,
    });
  },
  component: AssetsLayout,
});

function AssetsLayout() {
  const { data: assets } = useQuery({
    queryKey: ["assets"],
    queryFn: fetchAssets,
  });
  console.log(assets);

  return (
    <div className="flex h-screen">
      <aside className="w-64 border-r p-4">
        <h2 className="font-bold text-lg mb-3">Assets</h2>
        <ul className="space-y-1">
          {assets?.map((asset) => (
            <li key={asset.id}>
              <Link
                to="/assets/$assetId"
                params={{ assetId: asset.id }}
                className="flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-100 [&.active]:bg-blue-50 [&.active]:font-semibold"
              >
                <span
                  className={`w-2 h-2 rounded-full flex-shrink-0 ${
                    asset.status === "online"
                      ? "bg-green-500"
                      : asset.status === "degraded"
                        ? "bg-yellow-500"
                        : "bg-red-500"
                  }`}
                />
                {asset.name}
              </Link>
            </li>
          ))}
        </ul>
      </aside>
      <Outlet />
    </div>
  );
}
