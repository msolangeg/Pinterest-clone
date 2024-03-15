import Header from "./components/Header";
import InfiniteScroll from "react-infinite-scroller";
import { createApi } from "unsplash-js";
import { useState, useEffect, useRef } from "react";
import Masonry from "@mui/lab/Masonry";
import Cards from "./components/Cards";
import { useBookStore } from "./store/bookStore";

import "./App.css";

const api = createApi({
  accessKey: "Vmgrq301WP1DGRi03wXnnfPSAS56P0I9BSpu8YXo5dw",
});

function App() {
  const [data, setData] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  let index = useRef(1)

  const val= useBookStore(state => state.value) //seteamos el estado y recueperamos el valor que tenemos en bookStore
  console.log("data", data);
  console.log("val", val);

  useEffect(() => {
    api.search
      .getPhotos({ query: val, perPage: 20, page: index.current})
      .then((result) => {
        setData(result.response.results);
      })
      .catch(() => {
        console.log("something went wrong!");
      });
  }, [val]);

  const moreData = () => {
    index.current = index.current + 1
    if(index.current === 3) {  //borrar 
      setHasMore(false)
    }

    api.search
      .getPhotos({ query: val, perPage: 20, page: index.current })
      .then((result) => {
        setData(data.concat(result.response.results)); // de esta forma concatenamos la informacion a medida que scroleamos sin borrar lo anterior. porque si solo dejabamos result.response.results traia la nueva info pero siempre se montaba la page nuevamente como si cambiaramos de pagina. 
      })
      .catch(() => {
        console.log("something went wrong!");
      });
  };

  return (
    <div className="container">
      <Header />
      <InfiniteScroll
        dataLength={data.length}
        hasMore={hasMore} //true
        loadMore={moreData}
        loader={
          <div className="loader" key={0}>
            Loading ...
          </div>
        }
      >
        <Masonry columns={4} spacing={2} className="masonry">
          {data.map((item) => (
            <Cards key={item.id} item={item} />
          ))}
        </Masonry>
      </InfiniteScroll>
    </div>
  );
}

export default App;
