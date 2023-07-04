import { renderHook } from "@testing-library/react-hooks";
import { toBase64, useImagesUpload } from "./useImagesUpload";
import { vi } from "vitest";

describe("useImagesUpload", () => {
  it("should upload images when the file size is less than or equal to maxFileSize", async () => {
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

    await handleImagesChange({ target: inputElement } as any);
    const [uploadedFiles] = result.current;

    const expectedFiles = [
      { src: await toBase64(file1), name: file1.name },
      { src: await toBase64(file2), name: file2.name },
    ];
    expect(uploadedFiles).toEqual(expectedFiles);
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
