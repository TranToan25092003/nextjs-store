import {
  fetchAdminProductDetails,
  updateImageProductAction,
  updateProductAction,
} from "@/utils/actions";
import FormContainer from "@/components/form/FormContainer";
import FormInput from "@/components/form/FormInput";
import PriceInput from "@/components/form/PriceInput";
import TextAreaInput from "@/components/form/TextAreaInput";
import CheckboxInput from "@/components/form/CheckboxInput";
import SubmitButton from "@/components/form/Button";
import ImageInputContainer from "@/components/form/ImageInputContainer";

const EditProductPage = async ({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) => {
  const { id } = await params;

  const product = await fetchAdminProductDetails(id);

  const { name, company, description, featured, price, image } = product;

  return (
    <section>
      <h1 className="text-2xl font-semibold mb-8 capitalize ">
        update product
      </h1>

      <div className="border rounded p-8">
        {/* image container */}
        <ImageInputContainer
          action={updateImageProductAction}
          name={name}
          image={image}
          text="update image"
        >
          <input type="hidden" name="id" value={id} />
          <input type="hidden" name="url" value={image}></input>
        </ImageInputContainer>

        <FormContainer action={updateProductAction}>
          <div className="grid gap-4 md:grid-cols-2 my-4">
            <input type="hidden" name="id" value={id} />
            <FormInput
              type="text"
              name="name"
              label="product name"
              defaultValue={name}
            ></FormInput>

            <FormInput
              type="text"
              name="company"
              label="company"
              defaultValue={company}
            ></FormInput>

            <PriceInput defaultValue={price}></PriceInput>

            <TextAreaInput
              name="description"
              labelText="product description"
              defaultValue={description}
            ></TextAreaInput>
          </div>

          <div className="mt-6">
            <CheckboxInput
              name="featured"
              defaultChecked={featured}
              label="featured"
            ></CheckboxInput>

            <SubmitButton text="update" className="mt-8"></SubmitButton>
          </div>
        </FormContainer>
      </div>
    </section>
  );
};

export default EditProductPage;
