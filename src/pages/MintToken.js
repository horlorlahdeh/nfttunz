import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import Header from "../components/Header";
import Layout from "../components/Layout";
import { createToken } from "../actions/token";
import { setToastNotification, uploadFile } from "../utils/helpers";
import UploadLoader from "../components/UploadLoader";

const MintToken = ({ createToken, settings: {categories} }) => {
  const [formData, setFormData] = useState({
    name: "",
    collectionName: "",
    description: "",
    rights: 3,
    tags: "",
    editions: 1,
    notes: "Lorem lipsum",
  });
  const [agreed, setAgreed] = useState(false);
  const [agreements, setAgreements] = useState([]);
  const [nsfw, setNsfw] = useState(false);
  const [category, setCategory] = useState('Hip Hop')
  const [thumbnail, setThumbnail] = useState("");
  const [thumbnailName, setThumbnailName] = useState("");
  const [nftFile, setNftFile] = useState("");
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const [fileLoading, setFileLoading] = useState(false);
  const [progress, setProgress] = useState("");

  const {
    name,
    collectionName,
    description,
    rights,
    tags,
    editions,
    contentCategory,
    notes,
  } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onAgreementCheck = (e) => {
    let checkElem = document.getElementById(`${e.target.name}`);
    if (agreements.includes(e.target.value) && !checkElem.checked) {
      let updatedAgreements = agreements.filter(
        (agr) => agr !== e.target.value
      );
      setAgreements([...updatedAgreements]);
      return;
    }
    setAgreements([...agreements, e.target.value]);
  };
  const handleThumbnailUpload = async (e) => {
    setLoading(true);
    const thumbn = e.target.files[0];
    const uploadData = await uploadFile(thumbn, "thumbnail");
    if (!uploadData) {
      setToastNotification("Unsurported file type", "error");
      setLoading(false);
      return;
    }
    setThumbnail(uploadData.data?.url);
    setThumbnailName(e.target.files[0].name);
    setProgress(uploadData.progress);
    setLoading(false);
    setToastNotification('Thumbnail Uploaded successful', 'green')
  };
  const handleFileUpload = async (e) => {
    setFileLoading(true);
    const thumbn = e.target.files[0];
    const uploadData = await uploadFile(thumbn, "file");
    if(!uploadData) {
      setToastNotification('Unsurported file type', 'error');
      setFileLoading(false)
      return 
    }
    setNftFile(uploadData.data?.url);
    setFileName(e.target.files[0].name);
    setProgress(uploadData.data.progress);
    setFileLoading(false);
    setToastNotification("Thumbnail Uploaded successful", "green");
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    if (agreements.length < 8) {
      alert("You must agree to all eight terms");
      return;
    }
    if(!agreed) {
      alert('You must agree to all the terms')
      return
    }
    const payload = {
      action: "mint",
      name: name,
      collection: collectionName,
      category: category,
      rights: rights,
      editions: editions,
      nsfw: nsfw,
      type: contentCategory,
      thumbnail: thumbnail,
      file: nftFile,
      notes: notes,
      tags: tags.split(" "),
      description: description,
    };
    console.log(payload)
    // Do something keychain to broadcast transactions
    createToken(payload);
  };

  return (
    <Fragment>
      <Layout>
        <Header title="Mint NFTs" button={false} />
        <section className="section__wrapper">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="info__text__wrapper">
                  <p className="info__text text-center">
                    Your current balance is 1000 BEE, which is enought to mint
                    up to 2000 editions. <br />
                    The first edition costs 15 BEE and each additional costs 5
                    BEE. Please check your balance now and gather some BEE on
                    your wallet if you plan to issue more than 2000 tokens.
                  </p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-2"></div>
              <div className="col-md-8">
                <div className="mint__form__wrapper">
                  <form className="mint__form" onSubmit={(e) => onSubmit(e)}>
                    <div className="double__input__row">
                      <div className="nfttunz__input__wrapper nfttunz__input__border w-50 d-flex">
                        <select
                          className="nfttunz__select w-100 text-center"
                          name="contentCategory"
                          id="contentCategory"
                          onChange={onChange}
                        >
                          <option value={contentCategory} className='text-center'>
                            Select Content Type
                          </option>
                          <option value="audio">Audio</option>
                          <option value="video">Video</option>
                         
                        </select>
                      </div>
                      
                    </div>
                    <div className="double__input__row">
                      <div className="nfttunz__input__wrapper nfttunz__input__border w-50">
                        <input
                          value={name}
                          name="name"
                          onChange={onChange}
                          className="nfttunz__input"
                          type="search"
                          placeholder="Name*"
                          aria-label="Search"
                        />
                      </div>
                      <div className="nfttunz__input__wrapper nfttunz__input__border w-50">
                        <input
                          value={collectionName}
                          name="collectionName"
                          onChange={onChange}
                          className="nfttunz__input"
                          type="search"
                          placeholder="Collection Name*"
                          aria-label="Search"
                        />
                      </div>
                    </div>
                    <div className="double__input__row">
                      <div className="nfttunz__input__wrapper nfttunz__file__wrapper">
                        <div className="button__and__loader">
                          <input
                            placeholder="Enter your password again"
                            className="steps__input hidden"
                            name="thumbnail"
                            id="thumbnail"
                            type="file"
                            onChange={handleThumbnailUpload}
                            style={{ display: "none" }}
                          />
                          <label
                            className="custom-file-label upload__button"
                            htmlFor="thumbnail"
                          >
                            {thumbnailName?.length > 0
                              ? thumbnailName
                              : "Choose thumbnail"}
                          </label>

                          {loading && (
                            <Fragment>
                              <UploadLoader />
                              <strong>
                                {progress ? `${progress}%` : "0%"}
                              </strong>
                            </Fragment>
                          )}
                        </div>
                      </div>
                      <div className="nfttunz__input__wrapper nfttunz__file__wrapper">
                        <div className="button__and__loader">
                          <input
                            placeholder="Enter your password again"
                            className="steps__input hidden"
                            name="nftFile"
                            id="nftFile"
                            type="file"
                            onChange={handleFileUpload}
                            style={{ display: "none" }}
                          />
                          <label
                            className="custom-file-label upload__button"
                            htmlFor="nftFile"
                          >
                            {fileName?.length > 0 ? fileName : "Choose file"}
                          </label>
                          {fileLoading && (
                            <Fragment>
                              <UploadLoader />
                              <small>{progress ? `${progress}%` : "0%"}</small>
                            </Fragment>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="double__input__row">
                      <div className="nfttunz__input__wrapper nfttunz__input__border w-100 d-flex">
                        <textarea
                          value={description}
                          name="description"
                          onChange={onChange}
                          className="nfttunz__textarea w-100"
                          type="search"
                          placeholder="Collection Description*"
                          aria-label="Search"
                        ></textarea>
                      </div>
                    </div>
                    <div className="double__input__row">
                      <div className="nfttunz__input__wrapper nfttunz__input__border w-50 d-flex">
                        <select
                          className="nfttunz__select w-100"
                          name="rights"
                          id="rights"
                          onChange={onChange}
                        >
                          <option value='Select rights' disabled>
                            Select rights
                          </option>
                          <option value="1">Private</option>
                          <option value="2">Limited</option>
                          <option value="3">Public</option>
                        </select>
                      </div>
                      <div className="nfttunz__input__wrapper nfttunz__input__border w-50">
                        <input
                          value={editions}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              editions: e.target.value,
                            })
                          }
                          className="nfttunz__input"
                          type="number"
                          placeholder="Number of editions*"
                          aria-label="editions"
                        />
                      </div>
                    </div>
                    <div className="double__input__row">
                      <div className="nfttunz__input__wrapper nfttunz__input__border w-50 d-flex">
                        <select
                          className="nfttunz__select w-100"
                          name="nsfw"
                          id="nsfw"
                          onChange={(e) => setNsfw(e.target.value)}
                        >
                          <option value="NSFW" disabled>
                            Not Safe for Work
                          </option>
                          <option value={true}>NSFW - Yes</option>
                          <option value={false}>NSFW - No</option>
                        </select>
                      </div>
                      <div className="nfttunz__input__wrapper nfttunz__input__border w-50 d-flex">
                        <select
                          className="nfttunz__select w-100"
                          name="category"
                          id="category"
                          onChange={(e) => setCategory(e.target.value)}
                        >
                          <option value={rights} disabled>
                            Select Category
                          </option>
                          {categories?.map((cat, index) => {
                            return (
                              <option key={index} value={cat}>
                                {cat}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </div>
                    <div className="double__input__row">
                      <div className="info__text__wrapper margin__five padding__ten">
                        <p className="info__text small__text muted p-0">
                          By selecting 'Private' the owner has no rights to
                          reproduce or use the work commercially. By selecting
                          'Limited Reproduction Rights' the artist grants the
                          owner full commercial rights for the work to be used
                          or recreated in commerce but does not give away the
                          creator's license.
                        </p>
                      </div>
                    </div>
                    <div className="double__input__row">
                      <div className="nfttunz__input__wrapper nfttunz__input__border w-100">
                        <input
                          value={tags}
                          name="tags"
                          onChange={onChange}
                          className="nfttunz__input"
                          type="text"
                          placeholder="Enter tags* separated by space"
                          aria-label="Search"
                        />
                      </div>
                    </div>

                    {/* Agreements */}
                    <div className="double__input__row">
                      <div className="nfttunz__input__wrapper nfttunz__input__border nfttunz__checkbox__wrapper w-100">
                        <input
                          value="consent"
                          name="consent"
                          id="consent"
                          onChange={onAgreementCheck}
                          className="nfttunz__checkbox"
                          type="checkbox"
                          aria-label="Search"
                        />
                        <label
                          className="checkbox__label small__text"
                          htmlFor="avatar"
                        >
                          I have obtained consent and model release of all
                          recognizable models (if any) inthis consent and can
                          provide the release upon request.
                        </label>
                      </div>
                    </div>
                    <div className="double__input__row">
                      <div className="nfttunz__input__wrapper nfttunz__input__border nfttunz__checkbox__wrapper w-100">
                        <input
                          value="copyright"
                          name="copyright"
                          id="copyright"
                          onChange={onAgreementCheck}
                          className="nfttunz__checkbox"
                          type="checkbox"
                          aria-label="Search"
                        />
                        <label
                          className="checkbox__label small__text"
                          htmlFor="avatar"
                        >
                          I agree to only tokenize work I created that does not
                          infringe on any copyright. If I am referencing someone
                          else's art or work for more than 5% of the content I
                          have received their consent.
                        </label>
                      </div>
                    </div>
                    <div className="double__input__row">
                      <div className="nfttunz__input__wrapper nfttunz__input__border nfttunz__checkbox__wrapper w-100">
                        <input
                          value="tokenize"
                          name="tokenize"
                          id="tokenize"
                          onChange={onAgreementCheck}
                          className="nfttunz__checkbox"
                          type="checkbox"
                          aria-label="Search"
                        />
                        <label
                          className="checkbox__label small__text"
                          htmlFor="avatar"
                        >
                          I will not tokenize the same peice again.
                        </label>
                      </div>
                    </div>
                    <div className="double__input__row">
                      <div className="nfttunz__input__wrapper nfttunz__input__border nfttunz__checkbox__wrapper w-100">
                        <input
                          value="violence"
                          name="violence"
                          id="violence"
                          onChange={onAgreementCheck}
                          className="nfttunz__checkbox"
                          type="checkbox"
                          aria-label="Search"
                        />
                        <label
                          className="checkbox__label small__text"
                          htmlFor="avatar"
                        >
                          Graphic violence of flesh and blood of humans has been
                          marked "NSFW".
                        </label>
                      </div>
                    </div>
                    <div className="double__input__row">
                      <div className="nfttunz__input__wrapper nfttunz__input__border nfttunz__checkbox__wrapper w-100">
                        <input
                          value="sexual"
                          name="sexual"
                          id="sexual"
                          onChange={onAgreementCheck}
                          className="nfttunz__checkbox"
                          type="checkbox"
                          aria-label="Search"
                        />
                        <label
                          className="checkbox__label small__text"
                          htmlFor="avatar"
                        >
                          No sexual content of children in any format is
                          tolerated on the site. Minimum age is 18, our decision
                          is final.
                        </label>
                      </div>
                    </div>
                    <div className="double__input__row">
                      <div className="nfttunz__input__wrapper nfttunz__input__border nfttunz__checkbox__wrapper w-100">
                        <input
                          value="borderline"
                          name="borderline"
                          id="borderline"
                          onChange={onAgreementCheck}
                          className="nfttunz__checkbox"
                          type="checkbox"
                          aria-label="Search"
                        />
                        <label
                          className="checkbox__label small__text"
                          htmlFor="avatar"
                        >
                          Borderline pieces will be removed from display and our
                          file system and not refunded.
                        </label>
                      </div>
                    </div>
                    <div className="double__input__row">
                      <div className="nfttunz__input__wrapper nfttunz__input__border nfttunz__checkbox__wrapper w-100">
                        <input
                          value="banned"
                          name="banned"
                          id="banned"
                          onChange={onAgreementCheck}
                          className="nfttunz__checkbox"
                          type="checkbox"
                          aria-label="Search"
                        />
                        <label
                          className="checkbox__label small__text"
                          htmlFor="avatar"
                        >
                          Work that calls for violence we be removed and
                          creator(s) banned.
                        </label>
                      </div>
                    </div>
                    <div className="double__input__row">
                      <div className="nfttunz__input__wrapper nfttunz__input__border nfttunz__checkbox__wrapper w-100">
                        <input
                          value="understand"
                          name="understand"
                          id="understand"
                          onChange={onAgreementCheck}
                          className="nfttunz__checkbox"
                          type="checkbox"
                          aria-label="Search"
                        />
                        <label
                          className="checkbox__label small__text"
                          htmlFor="avatar"
                        >
                          I understand that if I violate the Terms of Service I
                          may be blacklisted from the site.
                        </label>
                      </div>
                    </div>
                    <br />
                    <div className="double__input__row">
                      <div className="nfttunz__input__wrapper nfttunz__input__border nfttunz__checkbox__wrapper info__text__wrapper w-100">
                        <input
                          value={agreed}
                          name="agreed"
                          id="agreed"
                          onChange={(e) => setAgreed(!agreed)}
                          className="nfttunz__checkbox"
                          type="checkbox"
                          aria-label="Search"
                        />
                        <label
                          className="checkbox__label small__text"
                          htmlFor="avatar"
                        >
                          This is an official NFT and I'd like to set a piece
                          for it.
                        </label>
                      </div>
                    </div>
                    {/* TODO: Prgrammatically calculate editions and fee from state */}
                    <strong className="margin__five">
                      Total Issuance fee for 1 edition(s): 15 CINE
                    </strong>
                    <br />
                    <br />
                    <input type="submit" value="Mint Tokens" />
                  </form>
                </div>
              </div>
              <div className="col-md-2"></div>
            </div>
          </div>
        </section>
      </Layout>
    </Fragment>
  );
};
const mapStateToProps = (state) => ({
  token: state.token,
  settings: state.settings,
});
export default connect(mapStateToProps, { createToken })(MintToken);
