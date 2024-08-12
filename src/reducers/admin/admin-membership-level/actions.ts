import { ReducerName } from '@enums/reducer-name';
import { PagingQuery } from '@models/entities/shared/pagination';
import { IMembershipLevel } from '@models/requests/membership.req';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  apiCreateMembershipLevel,
  apiDeleteMembershipLevel,
  apiGetAllMembershipLevels,
  apiUpdateMembershipLevel,
} from '@services/admin/admin-membership-level/admin-membership-level';

export enum MembershipLevelAction {
  getAllMembershipLevels = 'getAllMembershipLevels',
  createMembershipLevel = 'createMembershipLevel',
  updateMembershipLevel = 'updateMembershipLevel',
  deleteMembershipLevel = 'deleteMembershipLevel',
}

export const getAllMembershipLevelsAsync = createAsyncThunk(
  `${ReducerName.ADMIN_MEMBERSHIP_LEVEL}/${MembershipLevelAction.getAllMembershipLevels}`,
  async (query: PagingQuery) => {
    const response = await apiGetAllMembershipLevels(query);
    return response.result;
  },
);

export const createMembershipLevelAsync = createAsyncThunk(
  `${ReducerName.ADMIN_MEMBERSHIP_LEVEL}/${MembershipLevelAction.createMembershipLevel}`,
  async (data: IMembershipLevel) => {
    const response = await apiCreateMembershipLevel(data);
    return response.result.data;
  },
);

export const updateMembershipLevelAsync = createAsyncThunk(
  `${ReducerName.ADMIN_MEMBERSHIP_LEVEL}/${MembershipLevelAction.updateMembershipLevel}`,
  async ({ levelId, data }: { levelId: string; data: IMembershipLevel }) => {
    const response = await apiUpdateMembershipLevel(levelId, data);
    return response.result.data;
  },
);

export const deleteMembershipLevelAsync = createAsyncThunk(
  `${ReducerName.ADMIN_MEMBERSHIP_LEVEL}/${MembershipLevelAction.deleteMembershipLevel}`,
  async (levelId: string) => {
    const response = await apiDeleteMembershipLevel(levelId);
    return response.result.data;
  },
);
