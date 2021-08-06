import React, { Fragment, useState } from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import { setProfile } from "../../actions/profile";
import UploadLoader from "../../components/UploadLoader";
import axios from "../../utils/axios";
import { setToastNotification } from "../../utils/helpers";

const Edit = ({ setProfile }) => {
  const [formData, setFormData] = useState({
    full_name: "",
    bio: "",
    location: "",
    website: "",
    instagram: "",
    twitter: "",
    portfolio: "",
    soundcloud: "",
  });
  const [avatarName, setAvatarName] = useState("Choose an avatar");
  const [avatar, setAvatar] = useState("");
  const [loading, setLoading] = useState(false);
  const {
    full_name,
    bio,
    location,
    website,
    instagram,
    twitter,
    portfolio,
    soundcloud,
  } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onChangeFile = async (e) => {
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    };
    console.log(e.target.files[0]);
    console.log(avatar);
    setAvatar(e.target.files[0]);
    setAvatarName(e.target.files[0].name);
    let prepData = new FormData();
    prepData.append("image", e.target.files[0]);
    await axios.post("/avatar/upload", prepData, config);
    setToastNotification("Avatar uploaded", "success");
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await setProfile(formData);
    setLoading(false);
  };

  useEffect(() => {}, []);
  if (loading) {
    return (
      <div className="loader__wrapper text-center" style={{ height: "300px" }}>
        <UploadLoader />
        <strong>loading...</strong>
      </div>
    );
  }
  return (
    <Fragment>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="sub__profile__header">
              <h4>Edit Profile</h4>
            </div>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-md-1"></div>
          <div className="col-md-10 col-sm-12">
            <div className="file__player form__wrapper w-50 preview__card px-3 align-items-lg-stretch">
              <form encType="multipart/form-data" onSubmit={(e) => onSubmit(e)}>
                <input
                  placeholder="Enter your password again"
                  className="steps__input hidden"
                  name="image"
                  id="image"
                  type="file"
                  onChange={onChangeFile}
                  style={{ display: "none" }}
                />
                <label
                  className="custom-file-label upload__button"
                  htmlFor="image"
                >
                  {avatarName}
                </label>
                <br />
                <input
                  placeholder="Enter your first name"
                  className="steps__input"
                  type="text"
                  label="first name"
                  value={full_name}
                  name="full_name"
                  onChange={(e) => onChange(e)}
                />

                <textarea
                  className="steps__input"
                  id="bio"
                  name="bio"
                  value={bio}
                  onChange={(e) => onChange(e)}
                  rows="2"
                  cols="33"
                  placeholder="Enter your bio here"
                ></textarea>
                <input
                  placeholder="Enter your location"
                  className="steps__input"
                  type="text"
                  label="location"
                  value={location}
                  name="location"
                  onChange={(e) => onChange(e)}
                />
                <strong>Socials</strong>
                <input
                  placeholder="Enter your twitter"
                  className="steps__input"
                  type="text"
                  label="twitter"
                  value={twitter}
                  name="twitter"
                  onChange={(e) => onChange(e)}
                />
                <input
                  placeholder="Enter your instagram"
                  className="steps__input"
                  type="text"
                  label="instagram"
                  value={instagram}
                  name="instagram"
                  onChange={(e) => onChange(e)}
                />
                <input
                  placeholder="Enter your soundcloud"
                  className="steps__input"
                  type="text"
                  label="soundcloud"
                  value={soundcloud}
                  name="soundcloud"
                  onChange={(e) => onChange(e)}
                />
                <strong>Blogs</strong>

                <input
                  placeholder="Enter your website"
                  className="steps__input"
                  type="text"
                  label="website"
                  value={website}
                  name="website"
                  onChange={(e) => onChange(e)}
                />
                <input
                  placeholder="Enter your portfolio"
                  className="steps__input"
                  type="text"
                  label="portfolio"
                  value={portfolio}
                  name="portfolio"
                  onChange={(e) => onChange(e)}
                />
                <button type="submit" className="auth__button">
                  {loading ? "Loading..." : "Submit Changes"}
                </button>
              </form>
            </div>
          </div>
          <div className="col-md-1"></div>
        </div>
      </div>
    </Fragment>
  );
};

export default connect(null, { setProfile })(Edit);
