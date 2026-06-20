import type { Dispatch, SetStateAction } from "react";
import type { CompletedOrder } from "../context/AppContext";

// "2026.06.15 - 06.16 (1박)" -> { checkin: Date, checkout: Date }. The
// end date in this app's date strings omits the year (assumed same as start).
export function parseStayDates(datesStr: string): { checkin: Date; checkout: Date } | null {
  const match = datesStr.match(/^(\d{4})\.(\d{2})\.(\d{2})\s*-\s*(\d{2})\.(\d{2})/);
  if (!match) return null;
  const [, y, m1, d1, m2, d2] = match;
  const year = Number(y);
  return {
    checkin: new Date(year, Number(m1) - 1, Number(d1)),
    checkout: new Date(year, Number(m2) - 1, Number(d2)),
  };
}

export function getStayStatus(datesStr: string) {
  const parsed = parseStayDates(datesStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (parsed && parsed.checkout < today) {
    return { label: "이용 완료", badgeClass: "bg-neutral-100 text-neutral-500" };
  }
  return { label: "이용 예정", badgeClass: "bg-[#377DFF]/10 text-[#377DFF]" };
}

export function formatPaidAt(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "-";
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}.${pad(d.getMonth() + 1)}.${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export function formatDateLabel(d: Date) {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}.${pad(d.getMonth() + 1)}.${pad(d.getDate())}`;
}

// A reservation row isn't a first-class entity in the data model — it's one
// item within a completed order. Encode both ids into the URL param so the
// detail page can look the row back up. "__" is used as the separator since
// order numbers ("OS-12345678") never contain it.
export function buildReservationId(orderNumber: string, itemId: number) {
  return `${orderNumber}__${itemId}`;
}

function parseReservationId(id: string): { orderNumber: string; itemId: number } | null {
  const sep = id.lastIndexOf("__");
  if (sep === -1) return null;
  const orderNumber = id.slice(0, sep);
  const itemId = Number(id.slice(sep + 2));
  if (!orderNumber || Number.isNaN(itemId)) return null;
  return { orderNumber, itemId };
}

export function findReservation(orders: CompletedOrder[], id: string) {
  const parsed = parseReservationId(id);
  if (!parsed) return null;
  const order = orders.find((o) => o.orderNumber === parsed.orderNumber);
  if (!order) return null;
  const item = order.items.find((i) => i.id === parsed.itemId);
  if (!item) return null;
  return { order, item };
}

export function cancelReservation(
  setOrders: Dispatch<SetStateAction<CompletedOrder[]>>,
  orderNumber: string,
  itemId: number
) {
  setOrders((prev) =>
    prev
      .map((order) =>
        order.orderNumber === orderNumber
          ? { ...order, items: order.items.filter((i) => i.id !== itemId) }
          : order
      )
      .filter((order) => order.items.length > 0)
  );
}
