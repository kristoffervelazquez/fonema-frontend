import type { AxiosResponse } from "axios";
import axiosController from "../config/axiosController";
import type { RequestCreateTranscript, Transcript } from "./interfaces";

class TranscriptApi {
  private static _url = "/transcript";
  public static async create(data: RequestCreateTranscript) {
    return await axiosController.post(this._url, data);
  }

  public static async getAll() {
    return (await axiosController.get(this._url)) as AxiosResponse<
      Transcript[]
    >;
  }

  public static async getById(id: string | number) {
    return (await axiosController.get(
      `${this._url}/${id}`
    )) as AxiosResponse<Transcript>;
  }
}

export default TranscriptApi;
