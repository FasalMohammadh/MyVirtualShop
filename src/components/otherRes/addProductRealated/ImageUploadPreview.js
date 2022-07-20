import React, { Component } from "react";
import "../../css/ImageUploadPreview.css";

export default class ImageUploadPreview extends Component
{
	constructor(props)
	{
		super(props);
		this.state = {
			img1Src: undefined,
			img2Src: undefined,
			img3Src: undefined,
			img4Src: undefined,
			img5Src: undefined,
		};
		this.totImageCount = 0;
		this.finImages = [];
	}

	loadImages = () =>
	{
		let allImage = [];
		let i = 1;
		Object.values(this.state).forEach(src =>
		{
			if (src !== undefined)
			{
				allImage.push(
					<span className="bg-light border rounded-3" key={i}>
						<div>
							<img
								alt=""
								className="rounded-3"
								src={`${src}`}
							/>
						</div>

						<i role="button"
							className="rounded-circle border fa-solid fa-close fa-2x iup-tc"
							/>
					</span>
				);
				i++;
			}
		});
		return allImage;
	};

	handleChange = event =>
	{
		let images = event.target.files;
		if (this.totImageCount < 5)
		{
			for (let i = 0; i < images.length && this.totImageCount < 5; i++)
			{
				this.totImageCount++;
				this.finImages.push(images[i]);
				let image = URL.createObjectURL(images[i]);
				this.setState({ [`img${i + 1}Src`]: image });
			}
		}
	};

	giveImages = () => this.finImages;

	render()
	{
		return (
			<React.Fragment>
				<label
					role="button"
					className="image-upload-preview-lbl border-dark border border-2 rounded-3 p-2 d-flex align-items-center gap-2"
					htmlFor="img-input"
					title="You Can Insert Upto 5 Images"
					style={{ aspectRatio: "3/2" }}>
					<h4 className="text-center w-100">
						Upload Images
						<i className="ms-2 fa-solid fa-upload fa-2x" />
					</h4>
				</label>
				<input
					accept=".png,.jpeg,.jpg"
					multiple
					id="img-input"
					hidden
					type="file"
					onChange={this.handleChange}
				/>
				<div className="previewSmall gap-3">{this.loadImages()}</div>
			</React.Fragment>
		);
	}
}

// if (allImage) return allImage;
// if (allImage) console.log(allImage);
// let x = [];
// x.push(
// 	<span class="bg-light p-3 d-flex flex-column border rounded-3">
// 		<img class="img-fluid rounded-3" src="${image}" />
// 		<span>delete</span>
// 	</span>
// );
// x.push(
// 	<span class="bg-light p-3 d-flex flex-column border rounded-3">
// 		<img class="img-fluid rounded-3" src="${image}" />
// 		<span>delete</span>
// 	</span>
// );

/*if we set state repeadedly within sort time react will batch those and execute at once
			but if we get prev state and updated using it react will update the state as we expect */
