import React, { useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import Editor from "../Editor"; // Assume you are using a custom Editor component

const BlogModal = ({ show, data, onCancel, onConfirm, categories }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      content: "",
      excerpt: "",
      tags: "",
      category: "",
      meta: {
        title: "",
        desc: "",
        canonical: "",
        keywords: "",
      },
    },
  });

  // If in edit mode, prepopulate the form
  useEffect(() => {
    if (data) {
      for (const [key, value] of Object.entries(data)) {
        if (typeof value === "object") {
          for (const [nestedKey, nestedValue] of Object.entries(value)) {
            setValue(`meta.${nestedKey}`, nestedValue);
          }
        } else {
          setValue(key, value);
        }
      }
    }
  }, [data, setValue]);

  const handleEditorChange = useCallback(
    (content) => {
      setValue("content", content);
    },
    [setValue]
  );

  const onSubmit = (formData) => {
    if (data) {
      console.log("Editing blog:", formData);
    } else {
      console.log("Creating blog:", formData);
    }
    onConfirm(formData); // Call the onConfirm handler
  };

  if (!show) return null;

  return (
    <div className="confirm-box-overlay">
      <div className="confirm-box">
        <div className="confirm-box-header sticky-header d-flex justify-content-between align-items-center">
          <h3>{data ? "Edit Blog" : "Add Blog"}</h3>
          <button className="btn" onClick={onCancel}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="row">
          <div className="row">
            <div className="mb-3 col-md-6">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                {...register("title", { required: "Title is required" })}
              />
              {errors.title && (
                <span className="text-danger">{errors.title.message}</span>
              )}
            </div>

            <div className="mb-3 col-md-6">
              <label htmlFor="excerpt" className="form-label">
                Excerpt
              </label>
              <input
                type="text"
                className="form-control"
                id="excerpt"
                {...register("excerpt", { required: "Excerpt is required" })}
              />
              {errors.excerpt && (
                <span className="text-danger">{errors.excerpt.message}</span>
              )}
            </div>

            <div className="mb-3 col-md-12">
              <label htmlFor="content" className="form-label">
                Content
              </label>
              <Editor
                value={data?.content || ""}
                setValue={handleEditorChange}
              />
              {errors.content && (
                <span className="text-danger">{errors.content.message}</span>
              )}
            </div>

            <div className="mb-3 col-md-6">
              <label htmlFor="tags" className="form-label">
                Tags
              </label>
              <input
                type="text"
                className="form-control"
                id="tags"
                {...register("tags")}
              />
            </div>

            <div className="mb-3 col-md-6">
              <label htmlFor="category" className="form-label">
                Category
              </label>
              <select className=" ">
                {categories?.map((cate) => (
                  <option key={cate._id} className="">
                    {cate.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="row">
            <div className="mb-3 col-md-6">
              <label htmlFor="metaTitle" className="form-label">
                Meta Title
              </label>
              <input
                type="text"
                className="form-control"
                id="metaTitle"
                {...register("meta.title")}
              />
            </div>

            <div className="mb-3 col-md-6">
              <label htmlFor="metaDesc" className="form-label">
                Meta Description
              </label>
              <input
                type="text"
                className="form-control"
                id="metaDesc"
                {...register("meta.desc")}
              />
            </div>
          </div>

          <div className="row">
            <div className="mb-3 col-md-6">
              <label htmlFor="metaCanonical" className="form-label">
                Meta Canonical
              </label>
              <input
                type="text"
                className="form-control"
                id="metaCanonical"
                {...register("meta.canonical")}
              />
            </div>

            <div className="mb-3 col-md-6">
              <label htmlFor="metaKeywords" className="form-label">
                Meta Keywords
              </label>
              <input
                type="text"
                className="form-control"
                id="metaKeywords"
                {...register("meta.keywords")}
              />
            </div>
          </div>

          <div className=" d-flex justify-content-end px-5">
            <button
              className="btn btn-secondary w-auto px-5 py-2 mx-2"
              onClick={onCancel}
            >
              Cancel
            </button>

            <button type="submit" className="btn btn-primary w-auto px-5 py-2">
              {data ? "Update" : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BlogModal;
