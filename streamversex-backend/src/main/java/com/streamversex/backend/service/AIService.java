package com.streamversex.backend.service;

import com.streamversex.backend.dto.request.AnimeRecommendationRequestDTO;
import com.streamversex.backend.dto.request.CompareMoviesRequestDTO;
import com.streamversex.backend.dto.request.ExplainEndingRequestDTO;
import com.streamversex.backend.dto.request.MovieSummaryRequestDTO;
import com.streamversex.backend.dto.request.RecommendationRequestDTO;
import com.streamversex.backend.dto.response.AIResponseDTO;

public interface AIService {

    AIResponseDTO summarizeMovie(
            String userId,
            MovieSummaryRequestDTO request
    );

    AIResponseDTO explainEnding(
            String userId,
            ExplainEndingRequestDTO request
    );

    AIResponseDTO recommendMovies(
            String userId,
            RecommendationRequestDTO request
    );

    AIResponseDTO recommendAnime(
            String userId,
            AnimeRecommendationRequestDTO request
    );

    AIResponseDTO compareMovies(
            String userId,
            CompareMoviesRequestDTO request
    );

}