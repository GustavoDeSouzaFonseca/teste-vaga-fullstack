import Agency from "../schemas/Agency.js";
import neode from "../config/db/neo4j.js";

export default class AgencyService {

  static async createAgency(nrInst, nrAgencia) {
    try {
      const agency = await Agency.create({ nrInst, nrAgencia });
      return agency.toJson();
    } catch (error) {
      console.error('Erro ao criar agência:', error);
      throw error;
    }
  }

  static async getAllAgency() {
    try {
      const agency = await neode.all('Agency');
      return agency ? agency.toJson() : null;
    } catch (error) {
      console.error('Erro ao obter agência por número de instância:', error);
      throw error;
    }
  }

  static async getAgencyByNrInst(nrInst) {
    try {
      const agency = await neode.model('Agency').find(Number(nrInst));
      return agency ? agency.toJson() : null;
    } catch (error) {
      console.error('Erro ao obter agência por número de instância:', error);
      throw error;
    }
  }

  static async updateAgency(nrInst, nrAgencia) {
    try {
      const agency = await Agency.merge({ nrInst }, { nrAgencia });
      return agency.toJson();
    } catch (error) {
      console.error('Erro ao atualizar agência:', error);
      throw error;
    }
  }

  static async deleteAgency(nrInst) {
    try {
      await neode.deleteAll('Agency');
      return true;
    } catch (error) {
      console.error('Erro ao excluir agência:', error);
      throw error;
    }
  }
}