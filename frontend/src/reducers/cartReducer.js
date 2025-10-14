import { CART_ADD, CART_REMOVE, CART_CLEAR } from '../constants'

const loadInitial = () => {
    try {
        const raw = localStorage.getItem('cartItems')
        return raw ? JSON.parse(raw) : []
    } catch (e) {
        return []
    }
}

const save = (items) => {
    try { localStorage.setItem('cartItems', JSON.stringify(items)) } catch (e) {}
}

export const cartReducer = (state = { items: loadInitial() }, action) => {
    switch(action.type) {
        case CART_ADD: {
            const incoming = action.payload // {product, qty}
            const current = state.items || []
            const found = current.find(p => p.id === incoming.id)
            let next
            if (found) {
                next = current.map(p => p.id === incoming.id ? { ...p, qty: (p.qty || 1) + (incoming.qty || 1) } : p)
            } else {
                next = [...current, { ...incoming, qty: incoming.qty || 1 }]
            }
            save(next)
            return { ...state, items: next }
        }
        case CART_REMOVE: {
            const next = (state.items || []).filter(p => p.id !== action.payload)
            save(next)
            return { ...state, items: next }
        }
        case CART_CLEAR: {
            save([])
            return { ...state, items: [] }
        }
        default:
            return state
    }
}
