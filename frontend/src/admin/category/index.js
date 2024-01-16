import CategoryCreateForm from "./category-create.page";
import CategoryEditForm from "./category-edit.page";
import CategoryService from "./category.service";
import CategoryListPage from "./category-list.page";

const categorySvc= new CategoryService()

export default {
    CategoryCreateForm,
    categorySvc,
    CategoryListPage,
    CategoryEditForm,
}