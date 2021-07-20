import React, { Fragment, useState } from "react";
import Header from "../components/Header";
import Layout from "../components/Layout";

const MintToken = () => {
  const [formData, setFormData] = useState({
    name: "",
    collectionName: "",
    description: "",
    rights: "",
    nsfw: false,
    tags: "",
  });
  const [file, setFile] = useState("");

  const { name, collectionName, description, rights, nsfw, tags } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleFileUploads = () => {
    let prepData = new FormData();
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    // Do something keychain to broadcast transactions
    console.log(formData);
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
                  <form className="mint__form" onSubmit={onSubmit}>
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
                        <input
                          placeholder="Enter your password again"
                          className="steps__input hidden"
                          name="avatar"
                          id="avatar"
                          type="file"
                          onChange={handleFileUploads}
                          style={{ display: "none" }}
                        />
                        <label
                          className="custom-file-label upload__button"
                          htmlFor="avatar"
                        >
                          Choose Cover
                        </label>
                      </div>
                      <div className="nfttunz__input__wrapper nfttunz__file__wrapper">
                        <input
                          placeholder="Enter your password again"
                          className="steps__input hidden"
                          name="avatar"
                          id="avatar"
                          type="file"
                          onChange={handleFileUploads}
                          style={{ display: "none" }}
                        />
                        <label
                          className="custom-file-label upload__button"
                          htmlFor="avatar"
                        >
                          Choose File
                        </label>
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
                          name="editions"
                          id="editions"
                        >
                          <option value="" disabled>
                            Select rights
                          </option>
                          <option value="Private">Private</option>
                          <option value="Private">Public</option>
                        </select>
                      </div>
                      <div className="nfttunz__input__wrapper nfttunz__input__border w-50">
                        <input
                          value={file}
                          onChange={onChange}
                          className="nfttunz__input"
                          type="number"
                          placeholder="Number of editions*"
                          aria-label="Search"
                        />
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
                          value={file}
                          onChange={onChange}
                          className="nfttunz__input"
                          type="text"
                          placeholder="Enter tags* separated by space"
                          aria-label="Search"
                        />
                      </div>
                    </div>
                    <div className="double__input__row">
                      <div className="nfttunz__input__wrapper nfttunz__input__border nfttunz__checkbox__wrapper w-100">
                        <input
                          value={file}
                          onChange={onChange}
                          className="nfttunz__checkbox"
                          type="checkbox"
                          placeholder="Enter tags* separated by space"
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
                          value={file}
                          onChange={onChange}
                          className="nfttunz__checkbox"
                          type="checkbox"
                          placeholder="Enter tags* separated by space"
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
                          value={file}
                          onChange={onChange}
                          className="nfttunz__checkbox"
                          type="checkbox"
                          placeholder="Enter tags* separated by space"
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
                          value={file}
                          onChange={onChange}
                          className="nfttunz__checkbox"
                          type="checkbox"
                          placeholder="Enter tags* separated by space"
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
                          value={file}
                          onChange={onChange}
                          className="nfttunz__checkbox"
                          type="checkbox"
                          placeholder="Enter tags* separated by space"
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
                          value={file}
                          onChange={onChange}
                          className="nfttunz__checkbox"
                          type="checkbox"
                          placeholder="Enter tags* separated by space"
                          aria-label="Search"
                        />
                        <label
                          className="checkbox__label small__text"
                          htmlFor="avatar"
                        >
                          Borderline pieces will be removed fromdisplay and our
                          file system and not refunded.
                        </label>
                      </div>
                    </div>
                    <div className="double__input__row">
                      <div className="nfttunz__input__wrapper nfttunz__input__border nfttunz__checkbox__wrapper w-100">
                        <input
                          value={file}
                          onChange={onChange}
                          className="nfttunz__checkbox"
                          type="checkbox"
                          placeholder="Enter tags* separated by space"
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
                          value={file}
                          onChange={onChange}
                          className="nfttunz__checkbox"
                          type="checkbox"
                          placeholder="Enter tags* separated by space"
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
                          value={file}
                          onChange={onChange}
                          className="nfttunz__checkbox"
                          type="checkbox"
                          placeholder="Enter tags* separated by space"
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
                    <input type="button" value="Mint Tokens" />
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

export default MintToken;
