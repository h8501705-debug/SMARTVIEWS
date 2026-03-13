// ==================== COMPLETE NIFTY 500 STOCKS DATABASE ====================
const STOCK_DATABASE = {
    // NIFTY 50 (50 stocks)
    "RELIANCE": "NSE",
    "TCS": "NSE",
    "HDFCBANK": "NSE",
    "INFY": "NSE",
    "ICICIBANK": "NSE",
    "HINDUNILVR": "NSE",
    "ITC": "NSE",
    "SBIN": "NSE",
    "BHARTIARTL": "NSE",
    "KOTAKBANK": "NSE",
    "LT": "NSE",
    "WIPRO": "NSE",
    "ASIANPAINT": "NSE",
    "MARUTI": "NSE",
    "TITAN": "NSE",
    "SUNPHARMA": "NSE",
    "BAJFINANCE": "NSE",
    "AXISBANK": "NSE",
    "TATAMOTORS": "NSE",
    "NTPC": "NSE",
    "ONGC": "NSE",
    "POWERGRID": "NSE",
    "NESTLEIND": "NSE",
    "M&M": "NSE",
    "TATASTEEL": "NSE",
    "JSWSTEEL": "NSE",
    "HCLTECH": "NSE",
    "TECHM": "NSE",
    "GRASIM": "NSE",
    "INDUSINDBK": "NSE",
    "BRITANNIA": "NSE",
    "DIVISLAB": "NSE",
    "DRREDDY": "NSE",
    "CIPLA": "NSE",
    "UPL": "NSE",
    "SHREECEM": "NSE",
    "ADANIPORTS": "NSE",
    "HEROMOTOCO": "NSE",
    "BPCL": "NSE",
    "COALINDIA": "NSE",
    "EICHERMOT": "NSE",
    "HDFC": "NSE",
    "HDFCLIFE": "NSE",
    "SBILIFE": "NSE",
    "BAJAJFINSV": "NSE",
    "TATACONSUM": "NSE",
    "HINDALCO": "NSE",
    "ULTRACEMCO": "NSE",
    "ADANIENT": "NSE",
    "APOLLOHOSP": "NSE",
    
    // NIFTY NEXT 50 (Next 50 stocks)
    "VEDL": "NSE",
    "BERGEPAINT": "NSE",
    "DABUR": "NSE",
    "HAVELLS": "NSE",
    "ICICIPRULI": "NSE",
    "MARICO": "NSE",
    "PIDILITIND": "NSE",
    "SIEMENS": "NSE",
    "AMBUJACEM": "NSE",
    "AUROPHARMA": "NSE",
    "BANDHANBNK": "NSE",
    "BHARATFORG": "NSE",
    "BIOCON": "NSE",
    "BOSCHLTD": "NSE",
    "CADILAHC": "NSE",
    "COLPAL": "NSE",
    "CONCOR": "NSE",
    "CUMMINSIND": "NSE",
    "DLF": "NSE",
    "GAIL": "NSE",
    "GODREJCP": "NSE",
    "GODREJPROP": "NSE",
    "HAL": "NSE",
    "HINDZINC": "NSE",
    "ICICIGI": "NSE",
    "IDEA": "NSE",
    "INDIGO": "NSE",
    "IOC": "NSE",
    "IRCTC": "NSE",
    "JUBLFOOD": "NSE",
    "LUPIN": "NSE",
    "MCDOWELL-N": "NSE",
    "MOTHERSUMI": "NSE",
    "MRF": "NSE",
    "MUTHOOTFIN": "NSE",
    "NAUKRI": "NSE",
    "PAGEIND": "NSE",
    "PEL": "NSE",
    "PETRONET": "NSE",
    "PFC": "NSE",
    "PNB": "NSE",
    "RECLTD": "NSE",
    "SAIL": "NSE",
    "SRTRANSFIN": "NSE",
    "TORNTPHARM": "NSE",
    "TVSMOTOR": "NSE",
    "UBL": "NSE",
    "UNIONBANK": "NSE",
    "YESBANK": "NSE",
    "ZYDUSLIFE": "NSE"
};

// Convert database to array for easier manipulation
const ALL_STOCKS = Object.keys(STOCK_DATABASE).sort();

// Default watchlist (start with NIFTY 50)
const DEFAULT_WATCHLIST = [
    "RELIANCE", "TCS", "HDFCBANK", "INFY", "ICICIBANK",
    "HINDUNILVR", "ITC", "SBIN", "BHARTIARTL", "KOTAKBANK",
    "LT", "WIPRO", "ASIANPAINT", "MARUTI", "TITAN",
    "SUNPHARMA", "BAJFINANCE", "AXISBANK", "TATAMOTORS", "NTPC",
    "ONGC", "POWERGRID", "NESTLEIND", "M&M", "TATASTEEL",
    "JSWSTEEL", "HCLTECH", "TECHM", "GRASIM", "INDUSINDBK",
    "BRITANNIA", "DIVISLAB", "DRREDDY", "CIPLA", "UPL",
    "SHREECEM", "ADANIPORTS", "HEROMOTOCO", "BPCL", "COALINDIA",
    "EICHERMOT", "HDFC", "HDFCLIFE", "SBILIFE", "BAJAJFINSV",
    "TATACONSUM", "HINDALCO", "ULTRACEMCO", "ADANIENT", "APOLLOHOSP"
];

// Initialize watchlist
let watchlist = [];
let filteredWatchlist = [];
let selectedSymbols = new Set();

// ==================== INITIALIZATION ====================

// Load watchlist from localStorage or use default
function loadWatchlist() {
    const saved = localStorage.getItem("watchlist");
    if (saved) {
        watchlist = JSON.parse(saved);
    } else {
        watchlist = [...DEFAULT_WATCHLIST];
        saveWatchlist();
    }
    filteredWatchlist = [...watchlist];
}

function saveWatchlist() {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
    updateStats();
}

function updateStats() {
    const statsEl = document.getElementById("stats");
    if (statsEl) {
        statsEl.textContent = `📊 Total: ${watchlist.length} stocks • Displaying: ${filteredWatchlist.length}`;
    }
}

// ==================== SEARCH FUNCTIONALITY ====================

function initializeSearch() {
    const searchInput = document.getElementById('symbolSearch');
    const searchResults = document.getElementById('searchResults');
    
    if (!searchInput || !searchResults) return;
    
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.trim().toUpperCase();
        
        if (query.length < 1) {
            searchResults.classList.remove('show');
            return;
        }
        
        // Search in ALL_STOCKS database
        const matches = ALL_STOCKS.filter(symbol => 
            symbol.includes(query)
        ).slice(0, 15); // Limit to 15 results
        
        if (matches.length === 0) {
            searchResults.innerHTML = '<div class="search-result-item">No matches found</div>';
        } else {
            searchResults.innerHTML = matches.map(symbol => {
                const exchange = STOCK_DATABASE[symbol] || 'NSE';
                return `
                    <div class="search-result-item" onclick="selectSymbol('${symbol}')">
                        <span class="symbol">${symbol}</span>
                        <span class="exchange">${exchange}</span>
                    </div>
                `;
            }).join('');
        }
        
        searchResults.classList.add('show');
    });
    
    // Hide results when clicking outside
    document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
            searchResults.classList.remove('show');
        }
    });
}

function selectSymbol(symbol) {
    selectedSymbols.add(symbol);
    updateSelectedSymbolsDisplay();
    document.getElementById('symbolSearch').value = '';
    document.getElementById('searchResults').classList.remove('show');
}

function updateSelectedSymbolsDisplay() {
    const container = document.getElementById('selectedSymbols');
    if (!container) return;
    
    if (selectedSymbols.size === 0) {
        container.innerHTML = '';
        return;
    }
    
    container.innerHTML = Array.from(selectedSymbols).map(symbol => `
        <span class="selected-tag">
            ${symbol}
            <span class="remove" onclick="removeSelectedSymbol('${symbol}')">×</span>
        </span>
    `).join('');
}

function removeSelectedSymbol(symbol) {
    selectedSymbols.delete(symbol);
    updateSelectedSymbolsDisplay();
}

function addSelectedSymbols() {
    if (selectedSymbols.size === 0) {
        alert('Please select some symbols first');
        return;
    }
    
    let added = 0;
    let duplicates = 0;
    
    selectedSymbols.forEach(symbol => {
        if (!watchlist.includes(symbol)) {
            watchlist.push(symbol);
            added++;
        } else {
            duplicates++;
        }
    });
    
    if (added > 0) {
        saveWatchlist();
        filteredWatchlist = [...watchlist];
        renderTable();
    }
    
    alert(`✅ Added ${added} new stock(s)\n${duplicates > 0 ? `${duplicates} already existed` : ''}`);
    
    // Clear selection
    selectedSymbols.clear();
    updateSelectedSymbolsDisplay();
}

// ==================== WATCHLIST FUNCTIONS ====================

function deleteStock(symbol, event) {
    event.stopPropagation(); // Prevent row click
    
    if (confirm(`Remove ${symbol} from watchlist?`)) {
        watchlist = watchlist.filter(s => s !== symbol);
        saveWatchlist();
        filteredWatchlist = filteredWatchlist.filter(s => s !== symbol);
        renderTable();
    }
}

function clearWatchlist() {
    if (confirm('Remove ALL stocks from watchlist?')) {
        watchlist = [];
        saveWatchlist();
        filteredWatchlist = [];
        renderTable();
    }
}

function renderTable() {
    const tbody = document.getElementById("tableBody");
    if (!tbody) return;

    if (filteredWatchlist.length === 0) {
        tbody.innerHTML = `<tr><td colspan="4" class="empty-message">No stocks in watchlist</td></tr>`;
        return;
    }

    tbody.innerHTML = "";
    
    filteredWatchlist.forEach((symbol, i) => {
        const originalIndex = watchlist.indexOf(symbol);
        const exchange = STOCK_DATABASE[symbol] || 'NSE';
        
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td class="index">${originalIndex + 1}</td>
            <td class="symbol" onclick="window.location.href='chart.html?symbol=${encodeURIComponent(symbol)}&index=${originalIndex}'">${symbol}</td>
            <td><span class="exchange-badge">${exchange}</span></td>
            <td><button class="delete-btn" onclick="deleteStock('${symbol}', event)">Delete</button></td>
        `;
        
        tbody.appendChild(tr);
    });
    
    updateStats();
}

function filterSymbols() {
    const searchText = document.getElementById("searchInput")?.value.toUpperCase() || "";
    if (searchText === "") {
        filteredWatchlist = [...watchlist];
    } else {
        filteredWatchlist = watchlist.filter(symbol => 
            symbol.toUpperCase().includes(searchText)
        );
    }
    renderTable();
}

// ==================== INITIALIZATION ====================

// Load everything when page loads
document.addEventListener('DOMContentLoaded', () => {
    loadWatchlist();
    initializeSearch();
    renderTable();
});

// ==================== EXPORT FUNCTIONS ====================
window.selectSymbol = selectSymbol;
window.removeSelectedSymbol = removeSelectedSymbol;
window.addSelectedSymbols = addSelectedSymbols;
window.filterSymbols = filterSymbols;
window.deleteStock = deleteStock;
window.clearWatchlist = clearWatchlist;
