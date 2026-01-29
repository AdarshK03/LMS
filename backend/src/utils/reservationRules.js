export const canCancelReservation = (reservation) => {
  const now = new Date();
  const createdAt = new Date(reservation.createdAt);
  const diffMinutes = (now - createdAt) / (1000 * 60);

  return diffMinutes <= 5 && reservation.status === "ACTIVE";
};

export const hasRecentReservation = (reservations) => {
  const now = new Date();

  return reservations.some((r) => {
    const diffDays = (now - new Date(r.createdAt)) / (1000 * 60 * 60 * 24);
    return diffDays < 7 && r.status === "ACTIVE";
  });
};
