import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Chip, Typography, Paper, Stack, Divider, CircularProgress } from "@mui/material";
import { fetchAsset, fetchAssetHistory } from "../data/assets";
import type { AssetId } from "../data/assets";

export const Route = createFileRoute("/assets/$assetId")({
  loader: async ({ context: { queryClient }, params: { assetId } }) => {
    await queryClient.ensureQueryData({
      queryKey: ["asset", assetId],
      queryFn: () => fetchAsset(assetId as AssetId),
    });
    queryClient.prefetchQuery({
      queryKey: ["history", assetId],
      queryFn: () => fetchAssetHistory(assetId as AssetId),
    });
  },
  component: AssetDetail,
});

const STATUS_COLOR: Record<string, "success" | "warning" | "error"> = {
  online: "success",
  degraded: "warning",
  offline: "error",
};

function AssetDetail() {
  const { assetId } = Route.useParams();

  const { data: asset } = useQuery({
    queryKey: ["asset", assetId],
    queryFn: () => fetchAsset(assetId as AssetId),
  });

  const { data: history, isLoading: historyLoading } = useQuery({
    queryKey: ["history", assetId],
    queryFn: () => fetchAssetHistory(assetId as AssetId),
  });

  if (!asset) return <CircularProgress />;

  return (
    <Stack spacing={3} sx={{ p: 3 }}>
      <Stack direction="row" sx={{ alignItems: "center" }} spacing={2}>
        <Typography variant="h2">{asset.name}</Typography>
        <Chip
          label={asset.status}
          color={STATUS_COLOR[asset.status]}
          size="small"
        />
      </Stack>

      <Paper variant="outlined" sx={{ p: 2 }}>
        <Typography variant="body1" color="text.secondary">
          Lat: {asset.lat.toFixed(4)} · Lng: {asset.lng.toFixed(4)}
        </Typography>
      </Paper>

      <Divider />

      <div>
        <Typography variant="h2" gutterBottom>
          Position History
        </Typography>
        {historyLoading ? (
          <CircularProgress size={20} />
        ) : (
          <Stack spacing={1}>
            {history?.map((point) => (
              <Typography key={point.ts} variant="body1" color="text.secondary">
                {new Date(point.ts).toLocaleTimeString()} —{" "}
                {point.lat.toFixed(4)}, {point.lng.toFixed(4)}
              </Typography>
            ))}
          </Stack>
        )}
      </div>
    </Stack>
  );
}
