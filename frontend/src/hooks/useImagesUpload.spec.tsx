import { renderHook } from "@testing-library/react-hooks";
import { useImagesUpload } from "./useImagesUpload";
import { vi } from "vitest";

describe("useImagesUpload", () => {
  it("should upload images when the file size is less than or equal to maxFileSize", () => {
    const { result } = renderHook(() =>
      useImagesUpload({ maxFiles: 2, maxFileSize: 1000 })
    );
    const [, handleImagesChange] = result.current;

    const file1 = new File(["test1"], "test1.jpg", { type: "image/jpeg" });
    const file2 = new File(["test2"], "test2.jpg", { type: "image/jpeg" });
    const file3 = new File(["test3"], "test3.jpg", { type: "image/jpeg" });

    const inputElement = document.createElement("input");
    Object.defineProperty(inputElement, "files", {
      value: [file1, file2, file3],
    });
    const alert = vi.spyOn(window, "alert").mockImplementation(() => {});

    handleImagesChange({ target: inputElement } as any);

    const [uploadedFiles] = result.current;

    expect(uploadedFiles).toEqual([file1, file2]);
    alert.mockRestore();
  });

  it("should display an alert when there are too many images", () => {
    const { result } = renderHook(() =>
      useImagesUpload({ maxFiles: 2, maxFileSize: 1000 })
    );
    const [, handleImagesChange] = result.current;

    const file1 = new File(["test1"], "test1.jpg", { type: "image/jpeg" });
    const file2 = new File(["test2"], "test2.jpg", { type: "image/jpeg" });
    const file3 = new File(["test3"], "test3.jpg", { type: "image/jpeg" });

    const inputElement = document.createElement("input");
    Object.defineProperty(inputElement, "files", {
      value: [file1, file2, file3],
    });

    const alert = vi.spyOn(window, "alert").mockImplementation(() => {});

    handleImagesChange({ target: inputElement } as any);

    expect(alert).toHaveBeenCalledWith("Only 2 images will be uploaded");

    alert.mockRestore();
  });

  it("should display an alert when the file size is greater than maxFileSize", () => {
    const { result } = renderHook(() =>
      useImagesUpload({ maxFiles: 1, maxFileSize: 1 })
    );
    const [_, handleImagesChange] = result.current;

    const file = new File(["test"], "test.jpg", { type: "image/jpeg" });

    const inputElement = document.createElement("input");
    Object.defineProperty(inputElement, "files", {
      value: [file],
    });

    const alert = vi.spyOn(window, "alert").mockImplementation(() => {});

    handleImagesChange({ target: inputElement } as any);

    expect(alert).toHaveBeenCalledWith(
      "Some images are too big and will not be uploaded"
    );

    alert.mockRestore();
  });
});
