import { COMPARE_ADD, COMPARE_REMOVE, COMPARE_CLEAR } from '../constants'

const loadInitial = () => {
    try {
        const raw = localStorage.getItem('compareItems')
        return raw ? JSON.parse(raw) : []
    } catch (e) {
        return []
    }
}

const save = (items) => {
    try { localStorage.setItem('compareItems', JSON.stringify(items)) } catch (e) {}
}

export const compareReducer = (state = { items: loadInitial() }, action) => {
    switch(action.type) {
        case COMPARE_ADD: {
            const current = state.items || []
            // prevent duplicates, cap at 3
            const exists = current.find(p => p.id === action.payload.id)
            if (exists) return state
            if (current.length >= 3) return state
            const next = [...current, action.payload]
            save(next)
            return { ...state, items: next }
        }
        case COMPARE_REMOVE: {
            const next = (state.items || []).filter(p => p.id !== action.payload)
            save(next)
            return { ...state, items: next }
        }
        case COMPARE_CLEAR: {
            save([])
            return { ...state, items: [] }
        }
        default:
            return state
    }
}
