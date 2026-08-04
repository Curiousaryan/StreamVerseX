package com.streamversex.backend.service.impl;

import org.springframework.stereotype.Service;

import com.streamversex.backend.ai.GeminiClient;
import com.streamversex.backend.dto.request.AnimeRecommendationRequestDTO;
import com.streamversex.backend.dto.request.CompareMoviesRequestDTO;
import com.streamversex.backend.dto.request.ExplainEndingRequestDTO;
import com.streamversex.backend.dto.request.MovieSummaryRequestDTO;
import com.streamversex.backend.dto.request.RecommendationRequestDTO;
import com.streamversex.backend.dto.response.AIResponseDTO;
import com.streamversex.backend.exception.AIException;
import com.streamversex.backend.exception.UserNotFoundException;
import com.streamversex.backend.model.User;
import com.streamversex.backend.repository.UserRepository;
import com.streamversex.backend.service.AIService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AIServiceImpl implements AIService {

    private final GeminiClient geminiClient;
    private final UserRepository userRepository;

    // ==================== MOVIE SUMMARY ====================

    @Override
    public AIResponseDTO summarizeMovie(
            String userId,
            MovieSummaryRequestDTO request) {

        validatePremiumUser(userId);

        String prompt = """
                Summarize the movie "%s".

                Rules:
                - Maximum 150 words.
                - Do NOT reveal the ending.
                - Mention genre.
                - Use simple English.
                """
                .formatted(request.getMovieTitle());

        return AIResponseDTO.builder()
                .response(geminiClient.generateContent(prompt))
                .build();
    }

    // ==================== EXPLAIN ENDING ====================

    @Override
    public AIResponseDTO explainEnding(
            String userId,
            ExplainEndingRequestDTO request) {

        validatePremiumUser(userId);

        String prompt = """
                Explain the ending of the movie "%s".

                Rules:
                - Explain in simple English.
                - Mention important events.
                - Avoid unnecessary scientific terms.
                """
                .formatted(request.getMovieTitle());

        return AIResponseDTO.builder()
                .response(geminiClient.generateContent(prompt))
                .build();
    }

    // ==================== MOVIE RECOMMENDATIONS ====================

    @Override
    public AIResponseDTO recommendMovies(
            String userId,
            RecommendationRequestDTO request) {

        validatePremiumUser(userId);

        String prompt = """
                Recommend 10 movies similar to "%s".

                For every movie provide:

                • Movie Name
                • Genre
                • Why it is similar

                Avoid duplicate recommendations.
                """
                .formatted(request.getMovieTitle());

        return AIResponseDTO.builder()
                .response(geminiClient.generateContent(prompt))
                .build();
    }

    // ==================== ANIME RECOMMENDATIONS ====================

    @Override
    public AIResponseDTO recommendAnime(
            String userId,
            AnimeRecommendationRequestDTO request) {

        validatePremiumUser(userId);

        String prompt = """
                Recommend 10 anime similar to "%s".

                For every anime provide:

                • Anime Name
                • Genre
                • Why it is similar
                """
                .formatted(request.getAnimeTitle());

        return AIResponseDTO.builder()
                .response(geminiClient.generateContent(prompt))
                .build();
    }

    // ==================== COMPARE MOVIES ====================

    @Override
    public AIResponseDTO compareMovies(
            String userId,
            CompareMoviesRequestDTO request) {

        validatePremiumUser(userId);

        String prompt = """
                Compare "%s" and "%s".

                Compare using:

                • Story
                • Acting
                • Direction
                • Visual Effects
                • Music
                • IMDb-style Overall Rating

                Finally tell which movie you recommend.
                """
                .formatted(
                        request.getMovieOne(),
                        request.getMovieTwo()
                );

        return AIResponseDTO.builder()
                .response(geminiClient.generateContent(prompt))
                .build();
    }

    // ==================== PREMIUM VALIDATION ====================

    private void validatePremiumUser(String userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new UserNotFoundException("User not found.")
                );

        if (!user.isPremium()) {
            throw new AIException(
                    "AI features are available only for Premium users."
            );
        }
    }
}