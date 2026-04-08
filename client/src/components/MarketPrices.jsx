import React, { useEffect, useState ,useCallback} from 'react';

const MarketPrices = () => {
  const [data, setData] = useState([]);
  const [displayData, setDisplayData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(0);

  const [commodityFilter, setCommodityFilter] = useState('');
  const [stateFilter, setStateFilter] = useState('');
  const [marketFilter, setMarketFilter] = useState('');

  const API_KEY = '579b464db66ec23bdd000001194b25005e544b73446e6b02277ab6cb';
  const BASE_URL = 'https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070';
  const RECORDS_PER_PAGE = 100;

 const fetchMoreData = useCallback(async (currentOffset = offset) => {
  setLoading(true);
  try {
    const url = `${BASE_URL}?api-key=${API_KEY}&format=json&limit=${RECORDS_PER_PAGE}&offset=${currentOffset}`;
    const response = await fetch(url);
    const json = await response.json();

    if (json.records && json.records.length > 0) {
      const updatedData = [...data, ...json.records];
      setData(updatedData);
      setDisplayData(updatedData);
      localStorage.setItem('marketData', JSON.stringify(updatedData));
      setOffset(currentOffset + RECORDS_PER_PAGE);
    }
  } catch (error) {
    console.error('Error fetching market data:', error);
  }
  setLoading(false);
}, [offset, data]); // ✅ include dependencies it relies on


  useEffect(() => {
    const cached = localStorage.getItem('marketData');
    if (cached) {
      const parsed = JSON.parse(cached);
      setData(parsed);
      setDisplayData(parsed.slice(0, RECORDS_PER_PAGE));
      setOffset(RECORDS_PER_PAGE);
      setLoading(false);
    } else {
      fetchMoreData(0);
    }
  }, [fetchMoreData]);

 

  const filteredData = displayData.filter((record) => {
    return (
      (!commodityFilter || record.commodity?.toLowerCase().includes(commodityFilter.toLowerCase())) &&
      (!stateFilter || record.state?.toLowerCase().includes(stateFilter.toLowerCase())) &&
      (!marketFilter || record.market?.toLowerCase().includes(marketFilter.toLowerCase()))
    );
  });

  const handleClearFilters = () => {
    setCommodityFilter('');
    setStateFilter('');
    setMarketFilter('');
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen mt-20">
      {/* Marquee Disclaimer */}
     <div className="overflow-hidden whitespace-nowrap relative">
  <div className="animate-marquee text-red-600 px-4 font-semibold">
    📢 This data is displayed using the open API from https://data.gov.in. Prices may not be 100% up to date.
  </div>
</div>


      <h2 className="text-2xl font-bold text-center my-6">📊 Market Daily Prices </h2>

      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search Commodity"
          value={commodityFilter}
          onChange={(e) => setCommodityFilter(e.target.value)}
          className="px-4 py-2 rounded border border-gray-300 shadow-sm"
        />
        <input
          type="text"
          placeholder="Search State"
          value={stateFilter}
          onChange={(e) => setStateFilter(e.target.value)}
          className="px-4 py-2 rounded border border-gray-300 shadow-sm"
        />
        <input
          type="text"
          placeholder="Search Market"
          value={marketFilter}
          onChange={(e) => setMarketFilter(e.target.value)}
          className="px-4 py-2 rounded border border-gray-300 shadow-sm"
        />
        <button
          onClick={handleClearFilters}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Clear
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow-md rounded overflow-hidden text-sm">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="p-2">Commodity</th>
              <th className="p-2">State</th>
              <th className="p-2">District</th>
              <th className="p-2">Market</th>
              <th className="p-2">Variety</th>
              <th className="p-2">Arrival Date</th>
              <th className="p-2">Min Price</th>
              <th className="p-2">Max Price</th>
              <th className="p-2">Modal Price</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((record, idx) => (
              <tr key={idx} className="border-t">
                <td className="p-2">{record.commodity}</td>
                <td className="p-2">{record.state}</td>
                <td className="p-2">{record.district}</td>
                <td className="p-2">{record.market}</td>
                <td className="p-2">{record.variety}</td>
                <td className="p-2">{record.arrival_date}</td>
                <td className="p-2">{record.min_price}</td>
                <td className="p-2">{record.max_price}</td>
                <td className="p-2">{record.modal_price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Load More Button */}
      <div className="text-center mt-6">
        <button
          onClick={() => fetchMoreData()}
          disabled={loading}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? 'Loading...' : 'Load More'}
        </button>
      </div>
    </div>
  );
};

export default MarketPrices;
