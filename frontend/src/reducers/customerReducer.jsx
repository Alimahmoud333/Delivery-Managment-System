// src/context/customerReducer.jsx

export default function customerReducer(state, action) {
  switch (action.type) {
    /* ================= INIT ================= */
    case "init": {
      return action.payload;
    }

    /* ================= ADD ADDRESS ================= */
    case "add_address": {
      return {
        ...state,
        addresses: [...state.addresses, action.payload],
      };
    }

    /* ================= DELETE ADDRESS ================= */
    case "delete_address": {
      return {
        ...state,
        addresses: state.addresses.filter((a) => a.id !== action.payload.id),
      };
    }

    /* ================= SET ADDRESSES ================= */
    case "set_addresses": {
      return {
        ...state,
        addresses: action.payload,
      };
    }

    /* ================= SET ORDERS ================= */
    case "set_orders": {
      return {
        ...state,
        orders: action.payload,
      };
    }

    /* ================= ADD ORDER ================= */
    case "add_order": {
      return {
        ...state,
        orders: [action.payload, ...state.orders],
      };
    }

    /* ================= UPDATE ORDER STATUS ================= */
    case "update_order_status": {
      return {
        ...state,
        orders: state.orders.map((order) =>
          order.id === action.payload.id
            ? {
                ...order,
                status: action.payload.status,
              }
            : order,
        ),
      };
    }

    /* ================= UPDATE ORDER ================= */
    case "update_order": {
      return {
        ...state,
        orders: state.orders.map((order) =>
          order.id === action.payload.id ? action.payload : order,
        ),
      };
    }

    /* ================= UPSERT ORDER ================= */
    case "upsert_order": {
      const exists = state.orders.find((o) => o.id === action.payload.id);

      if (exists) {
        return {
          ...state,
          orders: state.orders.map((order) =>
            order.id === action.payload.id ? action.payload : order,
          ),
        };
      }

      return {
        ...state,
        orders: [action.payload, ...state.orders],
      };
    }

    /* ================= DELETE ORDER ================= */
    case "delete_order": {
      return {
        ...state,
        orders: state.orders.filter((o) => o.id !== action.payload.id),
      };
    }

    default:
      throw new Error("Unknown action: " + action.type);
  }
}
