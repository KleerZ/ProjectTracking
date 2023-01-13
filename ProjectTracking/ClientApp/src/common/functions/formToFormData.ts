import {FormGroup} from "@angular/forms";

export function formToFormData(form: FormGroup) {
  const formData = new FormData();
  for (const key of Object.keys(form.value)) {
    const value = form.value[key];
    formData.append(key, value)
  }

  return formData;
}
