import React, { useState, useEffect } from "react";
import { protectedAxios } from "../utils/axiosInstances";
import ConfirmBox from "../components/modals/ConfirmBox";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import PageLoader from "../components/PageLoader";
import Nodata from "../components/Nodata";

const BlogManager = () => {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalBlogs, setTotalBlogs] = useState(0);
  const [blogSelected, setBlogSelected] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [popUpMessage, setPopUpMessage] = useState("Do you want to delete this blog?");
  const [imageFilter, setImageFilter] = useState(false);
  const [sort, setSort] = useState(-1)


  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setIsLoading(true);
        let params = { page: currentPage, limit: 15, status: statusFilter, sort: sort }
        if (imageFilter) params['imageFilter'] = imageFilter

        const response = await protectedAxios.get("/blogs", { params });
        setBlogs(response?.data?.blogs || []);
        setTotalPages(response?.data?.totalPages || 1);
        setTotalBlogs(response?.data?.totalBlogs);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBlogs();
  }, [currentPage, statusFilter, imageFilter, sort]);

  const handleDelete = async () => {
    try {
      if (popUpMessage === "Do you want to Restore this blog?") {
        let slug = blogs.find((e) => e._id === blogSelected)?.meta?.canonical;
        await protectedAxios.put("/blogs/" + slug, { status: "draft" });
        setBlogs(
          blogs.map((E) => {
            if (E._id === blogSelected) {
              E["status"] = "draft";
            }
            return E;
          })
        );
      } else {
        await protectedAxios.delete(`/blogs/${blogSelected}`);
        setBlogs(
          blogs.map((E) => {
            if (E._id === blogSelected) {
              E["status"] = "archived";
            }
            return E;
          })
        );
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
    } finally {
      cancelDelete();
    }
  };

  const cancelDelete = () => {
    setBlogSelected(null);
    setShowDeleteModal(false);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Generate pagination buttons
  const getPaginationButtons = () => {
    const buttons = [];
    const maxButtons = 5; // Max number of pagination buttons to show
    const startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
    const endPage = Math.min(totalPages, startPage + maxButtons - 1);

    // Adjust startPage if endPage is less than maxButtons
    let adjustedStartPage = startPage;
    let adjustedEndPage = endPage;

    if (adjustedEndPage - adjustedStartPage < maxButtons - 1) {
      const difference = maxButtons - (adjustedEndPage - adjustedStartPage + 1);
      if (adjustedStartPage === 1) {
        // Adjust endPage when at the start
        adjustedEndPage = Math.min(totalPages, adjustedEndPage + difference);
      } else {
        // Adjust startPage when at the end
        adjustedStartPage = Math.max(1, adjustedStartPage - difference);
      }
    }

    for (let i = adjustedStartPage; i <= adjustedEndPage; i++) {
      buttons.push(
        <li
          key={i}
          className={`btn ${currentPage === i ? "active-pagination-dots" : ""}`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </li>
      );
    }
    return buttons;
  };

  const capitalizeFirstCh = (s) => {
    if (!s.trim()) return "";
    return s[0].toUpperCase() + s.slice(1);
  };

  return (
    <div className="border mb-50">
      <div className="d-flex justify-content-between align-items-center">
        <Header titleSupport={`(${totalBlogs})`} />
        <div className="px-4 d-flex">

          <select
            className="form-select mx-2"
            style={{ width: "auto" }}
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value={"all"}>Sort By</option>
            {[{ key: -1, name: "Newest First" }, { key: 1, name: "Oldest First" }].map((elm) => (
              <option key={`sort-by-${String(elm.key)}`} className="p-1" value={elm.key}>
                {elm.name}
              </option>
            ))}
          </select>

          <button
            onClick={() => setImageFilter(!imageFilter)}
            className={`btn ${!imageFilter ? 'btn-outline-secondary' : 'btn-warning'}`}>
            <i className="fa-solid fa-image"></i>
          </button>
          <select
            className="form-select mx-2"
            style={{ width: "auto" }}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value={"all"}>All</option>
            {["published", "draft", "archived"].map((statusElm) => (
              <option value={statusElm} className="p-1" key={statusElm}>
                {capitalizeFirstCh(statusElm)}
              </option>
            ))}
          </select>
          <button className="btn btn-info" onClick={() => setStatusFilter("")}>
            <i className="fa-solid fa-broom "></i>
          </button>
        </div>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Title</th>
            <th scope="col">Image</th>
            <th scope="col">Status</th>
            <th scope="col">Date</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {!isLoading &&
            blogs.map((blog, sr) => (
              <tr key={blog._id}>
                <th scope="row">{(currentPage - 1) * 15 + (sr + 1)}</th>
                <td onClick={() => navigate("/blogs/" + blog.meta.canonical)}>
                  {blog.title}
                </td>
                <td>
                  {blog.image ? (
                    <i className="fa-solid fa-image"></i>
                  ) : (
                    <i className="fa-solid fa-question"></i>
                  )}
                </td>
                <td>{blog.status}</td>
                <td>{new Date(blog.createdAt).toLocaleDateString()}</td>
                <td>
                  <button
                    className={`btn mx-2 btn-sm ${blog.status !== "archived" ? "btn-danger" : "btn-warning"
                      }`}
                    onClick={() => {
                      setPopUpMessage(
                        blog.status !== "archived"
                          ? "Do you want to delete this blog?"
                          : "Do you want to Restore this blog?"
                      );
                      setBlogSelected(blog._id);
                      setShowDeleteModal(true);
                    }}
                  >
                    <i
                      className={`fa-solid ${blog.status !== "archived"
                        ? "fa-trash"
                        : " fa-trash-arrow-up"
                        }`}
                    ></i>
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {isLoading && <PageLoader />}
      {!isLoading && !blogs.length && <Nodata />}

      {totalPages > 1 && blogs.length > 0 && (
        <div className="pagination">
          <ul>
            {currentPage > 1 && (
              <li
                className="btn btn-light"
                onClick={() => handlePageChange(currentPage - 1)}
              >
                Previous
              </li>
            )}
            {getPaginationButtons()}
            {currentPage < totalPages && (
              <li
                className="btn btn-light"
                onClick={() => handlePageChange(currentPage + 1)}
              >
                Next
              </li>
            )}
          </ul>
        </div>
      )}

      <ConfirmBox
        title="Confirm Delete"
        message={popUpMessage}
        open={showDeleteModal}
        onCancel={cancelDelete}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default BlogManager;
