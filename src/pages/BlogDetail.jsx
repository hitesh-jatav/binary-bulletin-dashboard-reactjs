import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import {
  fileUploadProtectedAxios,
  protectedAxios,
} from "../utils/axiosInstances";
import noImge from "../assets/images/noimage.jpg";
import CustomMultiSelect from "../components/FormInputs/CustomMultiSelect";

const BlogDetail = () => {
  const { slug } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [info, setInfo] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [categories, setCategories] = useState([]);

  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [status, setStatus] = useState("");
  const [content, setContent] = useState("");
  const [imgSrc, setImgSrc] = useState(null);
  const [category, setCategory] = useState("");

  const getBlogDetails = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await protectedAxios.get("/blogs/" + slug);
      setInfo(response.data);
      if (response.data.image) setImgSrc(response.data.image);
      setTitle(response.data.title);
      setContent(response.data.content);
      setExcerpt(response.data.excerpt);
      setCategory(response.data.category);
      setStatus(response.data.status);
    } catch (error) {
      console.error("Error fetching blog details:", error);
    } finally {
      setIsLoading(false);
    }
  }, [slug]);

  const getCategories = async () => {
    setIsLoading(true);
    try {
      const response = await protectedAxios.get("/category");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      uploadImage(formData);
    }
  };

  const uploadImage = async (formData) => {
    setIsUploading(true);
    try {
      const response = await fileUploadProtectedAxios.post(
        "/blogs/upload-image/" + slug,
        formData
      );

      if (response.status !== 201) {
        throw new Error("Image upload failed");
      }

      setImgSrc(response.data.path);
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const patchBlogDetail = async (payload) => {
    try {
      setIsUploading(true);
      await protectedAxios.put("/blogs/" + slug, payload);
    } catch (error) {
      console.log(error);
    } finally {
      setIsUploading(false);
    }
  };

  useEffect(() => {
    getBlogDetails();
    getCategories();
  }, [getBlogDetails]);

  return (
    <>
      <div className={`d-flex mb-2 ${isLoading ? "justify-content-between" : "justify-content-end"}`}>
        {isLoading && <div>Loading..</div>}
        {status === "published" && <button className="btn btn-danger">People might read this!</button>}
        {status === "draft" && <button className="btn btn-warning">People are waiting to read!</button>}
        {status === "archived" && <button className="btn btn-secondary">People might not read this!</button>}
      </div>
      {!isLoading && info && (
        <div className="row mb-20 pb-20">
          <div className="col-md-8 col-sm-12">
            <div dangerouslySetInnerHTML={{ __html: content }}></div>
          </div>

          <div className="col-md-4 col-lg-4 border col-sm-12 bg-grey">
            <div className={`btn btn-warning ${isUploading ? "" : "invisible"}`}>Updating Information....</div>

            <div className="profile-image-container">
              <img
                src={imgSrc || noImge}
                alt="" // Removed redundant wording
                className="img-fluid rounded-3"
                style={{
                  objectFit: "cover",
                  width: "100%",
                  height: "100%",
                  maxHeight: "none",
                }}
              />
              <input
                type="file"
                style={{
                  position: "absolute",
                  bottom: "10px",
                  right: "10px",
                  opacity: 0,
                  cursor: "pointer",
                }}
                disabled={isUploading}
                onChange={handleImageUpload}
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                className="position-absolute btn btn-primary"
                style={{
                  bottom: "10px",
                  right: "10px",
                  borderRadius: "5px",
                }}
              >
                <i className="fa-solid fa-upload"></i>
                {isUploading ? "UPLOADING..." : "UPLOAD"}
              </label>
            </div>
            <label className="mt-2">Title</label>
            <input
              type="text"
              value={title}
              className="form-control mb-10"
              onChange={(e) => setTitle(e.target.value)}
              onBlur={(e) => patchBlogDetail({ title: e.target.value })}
            />
            <label className="mt-2">Excerpt</label>
            <input
              type="text"
              value={excerpt}
              className="form-control mb-10"
              onChange={(e) => setExcerpt(e.target.value)}
              onBlur={(e) => patchBlogDetail({ excerpt: e.target.value })}
            />
            <label className="mt-2">Status</label>
            <select
              className="form-select"
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
                patchBlogDetail({ status: e.target.value });
              }}
            >
              {["published", "draft", "archived"].map((statusElm) => (
                <option value={statusElm} className="p-1" key={statusElm}>
                  {statusElm.charAt(0).toUpperCase() + statusElm.slice(1)}
                </option>
              ))}
            </select>
            <label className="mt-2">Category</label>

            <CustomMultiSelect
              disabled={isUploading}
              options={categories}
              selected={category}
              onSelected={(id) => {
                setCategory([...category, id]);
                patchBlogDetail({
                  category: [...category, id],
                });
              }}
              onRemoved={(id) => {
                setCategory(category.filter((e) => e !== id));
                patchBlogDetail({
                  category: category.filter((e) => e !== id),
                });
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default BlogDetail;
